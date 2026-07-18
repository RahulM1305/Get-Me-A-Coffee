"use server"

import bcrypt from "bcryptjs"
import connectDb from "@/db/connectDb"
import User from "@/models/User"

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const USERNAME_REGEX = /^[a-z0-9._-]{3,30}$/

// Creator pages live at /{username}, so app routes can't be usernames
const RESERVED_USERNAMES = ["login", "signup", "dashboard", "about", "api"]

export const registerUser = async ({ username, email, password }) => {
    username = (username || "").trim().toLowerCase()
    email = (email || "").trim().toLowerCase()

    if (!USERNAME_REGEX.test(username)) {
        return { error: "Username must be 3-30 characters — lowercase letters, numbers, dots, dashes or underscores." }
    }
    if (RESERVED_USERNAMES.includes(username)) {
        return { error: "That username is reserved — try another." }
    }
    if (!EMAIL_REGEX.test(email)) {
        return { error: "That doesn't look like a valid email address." }
    }
    if (!password || password.length < 8) {
        return { error: "Password must be at least 8 characters long." }
    }

    await connectDb()

    const existingEmail = await User.findOne({ email })
    if (existingEmail) {
        return { error: "An account with this email already exists. Try signing in instead." }
    }

    const existingUsername = await User.findOne({ username })
    if (existingUsername) {
        return { error: "That username is already taken — try another." }
    }

    const hashed = await bcrypt.hash(password, 10)
    await User.create({ email, username, password: hashed })

    return { success: true }
}

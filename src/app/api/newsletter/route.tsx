import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email address is required" }, { status: 400 })
    }

    const data = await resend.contacts.create({
      email: email,
      audienceId: process.env.RESEND_AUDIENCE_ID!,
    })

    // Send welcome email
    await resend.emails.send({
      from: "hello@mreseosa.com",
      to: email,
      subject: "Welcome to our newsletter!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #059669;">Welcome to our newsletter!</h2>
          <p>Thank you for subscribing to MR|ESEOSA blog newsletter. You'll receive our latest articles and insights directly in your inbox.</p>
          <p>We're excited to have you as part of our community!</p>
          <p>Best regards,<br>MR|ESEOSA Blog Team</p>
        </div>
      `,
    })

    return NextResponse.json({ message: "Successfully subscribed!" })
  } catch (error) {
    console.error("Newsletter subscription error:", error)
    return NextResponse.json({ error: "Failed to subscribe. Please try again." }, { status: 500 })
  }
}

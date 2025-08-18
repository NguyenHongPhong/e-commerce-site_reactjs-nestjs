export default function (otp: string, expireMinutes: number) {
    return `
            <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 8px; background: #ffffff;">
            <h2 style="color: #1961d2; text-align: center;">🔐 Your OTP to verify</h2>
            <p>Hello,</p>
            <p>You have requested a One-Time Password (OTP) to verify to your account. Please use the code below:</p>
            <div style="font-size: 26px; font-weight: bold; color: #333; background: #f6f6f6; padding: 12px; text-align: center; border-radius: 6px; letter-spacing: 4px;">
                ${otp}
            </div>
            <p>This code will expire in <strong>${expireMinutes} minutes</strong>. Do not share it with anyone for security reasons.</p>
            <hr style="margin: 20px 0;">
            <p style="font-size: 12px; color: #777;">If you did not request this OTP, you can safely ignore this email.</p>
            </div>
            `
}
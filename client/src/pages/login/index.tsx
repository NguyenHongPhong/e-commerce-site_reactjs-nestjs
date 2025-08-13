import LoginForm from "../../modules/auth/LoginForm";

export default function LoginPage() {
    return (<div className="">
        <div className="text-center text-gray-900 text-3xl font-semibold font-['Gordita'] leading-10 my-8">Sign In</div>
        <div className="text-zinc-400 text-base font-medium font-['Gordita'] 
                         leading-snug flex justify-center">
            <p className="w-[68%] text-center">
                Welcome back to sign in. As a returning customer, you have access to your previously saved all information.
            </p>
        </div>
        <LoginForm />
    </div>)
}
import RegisterForm from "@modules/auth/hooks/RegisterForm"
export default function RegisterPage() {
    return (
        <div className="">
            <div className="text-center text-gray-900 text-3xl font-semibold font-['Gordita'] leading-10 my-8">Sign Up</div>
            <div className="text-zinc-400 text-base font-medium font-['Gordita'] 
                                 leading-snug flex justify-center">
                <p className="w-[68%] text-center">
                    Let’s create your account and  Shop like a pro and save money.</p>
            </div>
            <RegisterForm />
        </div>
    )
}
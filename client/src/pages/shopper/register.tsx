import RegisterShopper from "@modules/shopper/hooks/RegisterShopper"
export const RegisterShpperPage = () => {
    return (<div className="@container">
        <div>
            <h2 className=" italic text-3xl font-bold text-gray-900 p-6 rounded text-center"
                style={{
                    textShadow: `
                        0 0 5px #0ff,
                        0 0 10px #0ff,
                        0 0 10px #0ff,
                        0 0 0px #0ff
        `,
                }}
            >SHOPPER REGISTER</h2>
            <RegisterShopper />
        </div>
    </div>)
}
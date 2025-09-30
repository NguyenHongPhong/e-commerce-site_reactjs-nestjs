import CreateForm from '@modules/product/hooks/CreateForm';
function ProductPage() {
    return (
        <div className="@container">
            <h2 className=" italic text-3xl font-bold text-gray-900 p-6 rounded text-center"
                style={{
                    textShadow: `
                        0 0 5px #0ff,
                        0 0 10px #0ff,
                        0 0 10px #0ff,
                        0 0 0px #0ff
        `,
                }}
            >CREATE PRODUCT</h2>
            <CreateForm />
        </div>
    )
}

export default ProductPage;
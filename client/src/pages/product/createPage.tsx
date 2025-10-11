import CreateForm from '@modules/product/hooks/CreateForm';
function ProductPage() {
    return (
        <div className="@container">
            <h2 className="text-center text-4xl font-extrabold text-[#185757] animate-glow">
                Create new product
            </h2>
            <CreateForm />
        </div>
    )
}

export default ProductPage;
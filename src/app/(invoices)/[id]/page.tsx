
export default async function Invoice({ params }: { params: { id: string } }) {
    const { id } = await params;

    return (<div>
        <h1>Invoice {id}</h1>
    </div>);
}
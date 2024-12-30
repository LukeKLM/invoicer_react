import CustomerTable from "@/app/components/tables/CustomerTable";

export default async function Customers() {

    return (
        <div>
            <h1>Customer</h1>
            <CustomerTable />
        </div>
    );
}
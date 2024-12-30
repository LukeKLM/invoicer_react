export default function InvoicesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            {children}
            <div>
                <h2>Invoice detail section</h2>
            </div>
        </div>
    );
}
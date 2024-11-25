export default function InvoicesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <div>
                <h2>Auth section</h2>
            </div>
            {children}
        </div>
    );
}
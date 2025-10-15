export default function Footer() {
    return (
        <footer className="bg-gray-100 text-gray-700 py-6 mt-8 shadow-md">
            <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm">&copy; {new Date().getFullYear()} Jeopardy</p>
            </div>
        </footer>
    );
}

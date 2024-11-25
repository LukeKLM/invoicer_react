interface InputFieldProps {
    label: String;
    id: String;
    name: String;
    type: String;
    required: Boolean;
}

export const InputField: React.FC<InputFieldProps> = ({ label, id, name, type, required = false }) => {
    return (
        <div>
            <label className="block text-sm/6 font-medium text-gray-900">{label}</label>
            <div className="mt-2">
                <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
            </div>
        </div>
    )
}
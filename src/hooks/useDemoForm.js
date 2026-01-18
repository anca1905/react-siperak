import { useState } from "react";

export function useDemoForm() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        business: "",
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function validate() {
        const newErrors = {};
        if (!form.name) newErrors.name = "Nama wajib diisi";
        if (!form.email) newErrors.email = "Email wajib diisi";
        if (!form.business) newErrors.business = "Nama bisnis wajib diisi";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    return {
        form,
        errors,
        loading,      // 👈 DIKELUARKAN
        setLoading,   // 👈 DIKELUARKAN
        handleChange,
        validate,
    };
}

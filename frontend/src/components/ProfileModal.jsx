import { useEffect, useState } from "react";
import api from "../services/api";

function EditProfileModal({
    employee,
    onClose,
    refreshProfile
}) {

    const [formData, setFormData] = useState({
        phone: "",
        password: ""
    });

    const [image, setImage] = useState(null);

    const [preview, setPreview] = useState(null);

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if (employee) {

            setFormData({
                phone: employee.phone || "",
                password: ""
            });

            if (employee.profile_image) {

                setPreview(
                    `http://127.0.0.1:5000/static/uploads/${employee.profile_image}`
                );

            } else {

                setPreview(null);

            }

        }

    }, [employee]);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleImage = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        setImage(file);

        setPreview(URL.createObjectURL(file));

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const data = new FormData();

            data.append("phone", formData.phone);

            if (formData.password !== "") {

                data.append("password", formData.password);

            }

            if (image) {

                data.append("image", image);

            }

            await api.put(
                "/employee/profile",
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            alert("Profile Updated Successfully");

            refreshProfile();

            onClose();

        }

        catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Unable to update profile."
            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div
            className="modal fade show"
            style={{
                display: "block",
                background: "rgba(0,0,0,.5)"
            }}
        >

            <div className="modal-dialog modal-lg">

                <div className="modal-content">

                    <div className="modal-header bg-primary text-white">

                        <h5 className="modal-title">

                            Edit My Profile

                        </h5>

                        <button
                            className="btn-close btn-close-white"
                            onClick={onClose}
                        />

                    </div>

                    <form onSubmit={handleSubmit}>

                        <div className="modal-body">

                            <div className="row">

                                <div className="col-md-4 text-center">

                                    {preview ? (

                                        <img
                                            src={preview}
                                            alt="Preview"
                                            width="180"
                                            height="180"
                                            className="rounded-circle border"
                                            style={{
                                                objectFit: "cover"
                                            }}
                                        />

                                    ) : (

                                        <img
                                            src="https://via.placeholder.com/180"
                                            alt=""
                                            className="rounded-circle"
                                        />

                                    )}

                                    <div className="mt-3">

                                        <input
                                            type="file"
                                            className="form-control"
                                            accept="image/*"
                                            onChange={handleImage}
                                        />

                                    </div>

                                </div>

                                <div className="col-md-8">

                                    <div className="mb-3">

                                        <label className="form-label">

                                            Name

                                        </label>

                                        <input
                                            className="form-control"
                                            value={employee.name}
                                            disabled
                                        />

                                    </div>

                                    <div className="mb-3">

                                        <label className="form-label">

                                            Email

                                        </label>

                                        <input
                                            className="form-control"
                                            value={employee.email}
                                            disabled
                                        />

                                    </div>

                                    <div className="mb-3">

                                        <label className="form-label">

                                            Phone

                                        </label>

                                        <input
                                            className="form-control"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                        />

                                    </div>

                                    <div className="mb-3">

                                        <label className="form-label">

                                            New Password

                                        </label>

                                        <input
                                            type="password"
                                            className="form-control"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="Leave blank to keep current password"
                                        />

                                    </div>

                                </div>

                            </div>

                        </div>

                        <div className="modal-footer">

                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={onClose}
                            >

                                Cancel

                            </button>

                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={loading}
                            >

                                {loading
                                    ? "Saving..."
                                    : "Save Changes"}

                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>

    );

}

export default EditProfileModal;
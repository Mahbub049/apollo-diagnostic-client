import { FcGoogle } from "react-icons/fc";
import Navbar from "../../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";

const Register = () => {
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { registerUser, updateUserInfo, googleLogin, setUser, user, loading } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const [districts, setDistricts] = useState([]);
  const [selectedDistricts, setSelectedDistricts] = useState("");
  const [upazillas, setUpazillas] = useState([]);

  const bloods = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  useEffect(() => {
    fetch("https://bdapis.com/api/v1.2/districts/")
      .then((res) => res.json())
      .then((data) => setDistricts(data.data));
  }, []);

  const handleDistrictChange = async (e) => {
    const selectedValue = e.target.value;
    console.log(selectedValue);
    setSelectedDistricts(selectedValue);

    fetch(`https://bdapis.com/api/v1.2/district/${selectedValue}`)
      .then((res) => res.json())
      .then((data) => setUpazillas(data.data.upazillas));
  };

  const onSubmit = async (data) => {
    data.status = "active";
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      const email = data.email;
      const password = data.password;
      const name = data.name;
      const blood = data.blood;
      const district = data.district;
      const upazilla = data.upazilla;
      const image = res.data.data.display_url;
      const user = {
        email,
        name,
        blood,
        district,
        upazilla,
        image,
        status: data.status,
      };
      registerUser(email, password)
        .then(() => {
          updateUserInfo(name, image)
            .then(() => {
              setUser({
                displayName: name,
                photoURL: image,
                email: email,
              });
              fetch("http://localhost:5000/users", {
                method: "POST",
                headers: {
                  "content-type": "application/json",
                },
                body: JSON.stringify(user),
              })
                .then((res) => res.json())
                .then((data) => {
                  Swal.fire({
                    title: "Success!",
                    text: "Successfully Registered!",
                    icon: "success",
                    confirmButtonText: "Okay",
                  });
                  navigate(location?.state ? location.state : "/");
                });
            })
            .catch(() => {
              Swal.fire({
                title: "Error!",
                text: "Something is wrong",
                icon: "error",
                confirmButtonText: "Okay",
              });
            });
        })
        .catch(() => {
          Swal.fire({
            title: "Error!",
            text: "User Already Exists",
            icon: "error",
            confirmButtonText: "Okay",
          });
        });
    }
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="hero h-[80vh]">
        <div className="hero-content w-1/2 flex-col">
          <div className="card w-full py-16 mt-12 shadow-2xl">
            <h3 className="font-bold text-5xl text-blue-500 mons mb-3">
              User Registration
            </h3>
            <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  className="input input-bordered"
                  required
                  {...register("email", { required: true })}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  className="input input-bordered"
                  required
                  {...register("name", { required: true })}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Avatar</span>
                </label>
                <input
                  type="file"
                  {...register("image", { required: true })}
                  className="file-input file-input-bordered file-input-info file-input-md w-full"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Blood Group</span>
                </label>
                <select
                  className="select select-info w-full"
                  {...register("blood", { required: true })}
                >
                  <option disabled selected>
                    Select Blood Group
                  </option>
                  {bloods.map((blood, index) => (
                    <option key={index} value={blood}>
                      {blood}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">District</span>
                </label>
                <select
                  {...register("district", { required: true })}
                  onChange={handleDistrictChange}
                  value={selectedDistricts}
                  className="select select-info w-full"
                >
                  <option disabled selected>
                    Select District
                  </option>
                  {districts.map((district, index) => (
                    <option key={index} value={district.district}>
                      {district.district}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Upazilla</span>
                </label>
                <select
                  className="select select-info w-full"
                  {...register("upazilla", { required: true })}
                >
                  <option disabled selected>
                    Select Upazilla
                  </option>
                  {upazillas.length > 0 &&
                    upazillas.map((upazilla, idx) => (
                      <option className="text-black" key={idx} value={upazilla}>
                        {upazilla}
                      </option>
                    ))}
                </select>
              </div>
              <div className="form-control mt-3">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  className="input input-bordered"
                  required
                  {...register("password", { required: true })}
                />
              </div>
              <div className="form-control mt-6">
                <button className="btn bg-blue-500 text-white text-lg mons">
                  Register
                </button>
              </div>
            </form>
            <p className="font-semibold mb-2 mons">
              Registration using Different Platforms
            </p>
            <div className="form-control mx-8">
              <button className="btn bg-white text-lg mons">
                <FcGoogle />
              </button>
            </div>
            <div>
              <p className="mt-2">
                Already have an account?{" "}
                <Link
                  className="text-blue-400 font-semibold underline"
                  to="/login"
                >
                  Login Now!
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

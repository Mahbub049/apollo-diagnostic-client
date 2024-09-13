import { FcGoogle } from "react-icons/fc";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Register = () => {
  const [districts, setDistricts] = useState([]);
  const [selectedDistricts, setSelectedDistricts] = useState("");
  const [upazillas, setUpazillas] = useState([]);

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

  console.log(upazillas)


  return (
    <div>
      <Navbar></Navbar>
      <div className="hero h-[80vh]">
        <div className="hero-content w-1/2 flex-col">
          <div className="card w-full py-16 mt-12 shadow-2xl">
            <h3 className="font-bold text-5xl text-blue-500 mons mb-3">
              User Registration
            </h3>
            <form className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  className="input input-bordered"
                  required
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
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Avatar</span>
                </label>
                <input
                  type="file"
                  className="file-input file-input-bordered file-input-info file-input-md w-full"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Blood Group</span>
                </label>
                <select className="select select-info w-full">
                  <option disabled selected>
                    Select Blood Group
                  </option>
                  <option>A+</option>
                  <option>A-</option>
                  <option>B+</option>
                  <option>B-</option>
                  <option>AB+</option>
                  <option>AB-</option>
                  <option>O+</option>
                  <option>O-</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">District</span>
                </label>
                <select
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
                  <select className="select select-info w-full">
                    <option disabled selected>
                      Select Upazilla
                    </option>
                    {upazillas.length > 0 && upazillas.map((upazilla, idx) => (
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
                />
              </div>
              <div className="form-control mt-6">
                <button className="btn bg-blue-500 text-white text-lg mons">
                  Login
                </button>
              </div>
            </form>
            <p className="font-semibold mb-2 mons">
              Login using Different Platforms
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
                  to="/register"
                >
                  Register Now!
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

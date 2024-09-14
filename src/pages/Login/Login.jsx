import { FcGoogle } from "react-icons/fc";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="hero h-[80vh]">
        <div className="hero-content w-1/2 flex-col">
          <div className="card w-full my-24 shadow-2xl">
            <h3 className="font-bold text-5xl text-blue-500 mons mb-3">
              User Login
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
                <p className="mt-2">Don't have an account? <Link className="text-blue-400 font-semibold underline" to="/register">Register Now!</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

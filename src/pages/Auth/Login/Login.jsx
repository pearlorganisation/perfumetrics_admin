import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function Login() {
  const Navigate = useNavigate()
  const [errorMsg, setErrorMsg] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const myEmail = "admin@saas.com";
  const myPass = "admin@123";


  useEffect(() => {
    if(localStorage.getItem('userAuth')) localStorage.clear()
    
  }, [])
  

  const onSubmit = (data) => {
    // Handle form submission here

    if (data.email === myEmail && data.password === myPass) {
      localStorage.setItem("userAuth", true);
      setErrorMsg(null);
      window.location.href = "/"
    } else {
      setErrorMsg("Invalid E-Mail/Password");
    }
  };

  return (
    <>
      <section className="h-screen w-full bg-neutral-200 ">
        <div className=" h-full  mx-auto border-2 ">
          <div className="g-6 flex h-full flex-wrap w-full text-neutral-800 dark:text-neutral-200">
            <div className="w-full h-full">
              <div className="block rounded-lg bg-white shadow-lg  h-full">
                <div className="g-0 grid grid-cols-[60%_auto] h-full">
                  {/* <!-- Left column container--> */}

                  <div
                    className="flex items-end rounded-b-lg lg:rounded-r-lg lg:rounded-bl-none  h-full w-full"
                    style={{
                      background:
                        "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                    }}
                  >
                    <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                      <h4 className="mb-6 text-4xl font-bold">
                        We are more than just an application
                      </h4>
                      <p className="text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad minim veniam, quis
                        nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo consequat.
                      </p>
                    </div>
                  </div>

                  {/* <!-- Right column container with background and description--> */}
                  <div class="w-full flex flex-col justify-center h-full bg-white rounded-lg shadow  md:mt-0  xl:p-0 ">
                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                      <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                        Sign in to your account
                      </h1>
                      {errorMsg && (
                        <div className="text-red-500 text-center">
                          {errorMsg}
                        </div>
                      )}
                      <form
                        class="space-y-4 md:space-y-6"
                        onSubmit={handleSubmit(onSubmit)}
                      >
                        <div>
                          <label
                            for="email"
                            class="block mb-2 text-sm font-medium text-gray-900 "
                          >
                            {" "}
                            Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            id="email"
                            class="bg-gray-50 border  text-gray-900 sm:text-sm rounded-lg ring-primary-600   block w-full p-2.5  "
                            placeholder="name@xyz.com"
                            {...register("email", { required: true })}
                            required
                          />
                        </div>
                        <div>
                          <label
                            for="password"
                            class="block mb-2 text-sm font-medium text-gray-900 "
                          >
                            Password
                          </label>
                          <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="••••••••"
                            class="bg-gray-50 border  text-gray-900 sm:text-sm rounded-lg ring-primary-600   block w-full p-2.5  s "
                            {...register("password", { required: true })}
                            required
                          />
                        </div>
                        <div class="flex items-center justify-between">
                          <div class="flex items-start">
                            <div class="flex items-center h-5">
                              <input
                                id="remember"
                                aria-describedby="remember"
                                type="checkbox"
                                class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300  dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                {...register("remember", { required: false })}
                              />
                            </div>
                            <div class="ml-3 text-sm">
                              <label for="remember" class="text-gray-500 ">
                                Remember me
                              </label>
                            </div>
                          </div>
                          <a
                            href="#"
                            class="text-sm font-medium text-blue-600 hover:underline dark:text-primary-500"
                          >
                            Forgot password?
                          </a>
                        </div>
                        <button
                          type="submit"
                          class="w-full text-white bg-[#2563eb] hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        >
                          Sign in to your account
                        </button>
                        <p class="text-sm font-light text-gray-500 ">
                          Don’t have an account yet?{" "}
                          <a
                            href="#"
                            class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                          >
                            Sign up
                          </a>
                        </p>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;

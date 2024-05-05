import { DNA } from "react-loader-spinner";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PrivateRoutes = ({
  children,
  auth,
}: {
  auth: boolean;
  children: React.ReactNode;
}): JSX.Element => {
  const [loading, setLoading] = useState(false);
  let time: NodeJS.Timeout;
  const run = () => {
    setLoading(true);
    time = setInterval(() => {
      if (auth) {
        setLoading(false);
        clearInterval(time);
      }
    }, 1000);
    setLoading(false);
  };
  useEffect(() => {
    run();
  }, []);

  if (loading) {
    return (
      <div className="grid h-screen place-content-center place-items-center">
        <DNA
          visible={true}
          height="80"
          width="80"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
      </div>
    );
  } else {
    clearInterval(time!);
    return auth ? (
      <>{children}</>
    ) : (
      <div className="min-h-screen flex items-center justify-center flex-col">
        <span>Pleas Log in Or Register </span>
        <Link to={"/auth"} className="text-blue-600 underline"> Click hear</Link>
      </div>
    );
  }
};
export default PrivateRoutes;

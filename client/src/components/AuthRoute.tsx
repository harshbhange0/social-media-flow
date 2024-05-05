import { DNA } from "react-loader-spinner";
import { useEffect, useState } from "react";

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
  };
  useEffect(() => {
    run();
  }, []);

  if (loading && !auth) {
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
    return <>{children}</>;
  }
};
export default PrivateRoutes;

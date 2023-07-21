import { useEffect, useState } from "react";
import { AuthData } from "../../auth/AuthWrapper";

export const Account = () => {
  const { user } = AuthData();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUserByUsername = async () => {
      if (!user.isAuthenticated) {
        setError("User is not authenticated");
        return;
      }

      console.log(user.name);

      const url = `http://localhost:8080/users/${user.name}`;
      const token = user.token;

      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }



        const userData = await response.json();
        setUserData(userData);
      } catch (error) {
        setError("Failed to fetch user data");
      }
    };

    getUserByUsername();
  }, [user]);

  return (
    <div className="page">

      {userData && (
        <div className="container">
        <div className="row">
          <div className="col-lg-5 m-auto">
            <div className="card mt-5">
              <div className="card-header text-center">
                <h4>Account information</h4>
              </div>
              <div className="card-body">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label fw-bold">First Name</label>
                  <div className="col-sm-9">
                    <input type="text" readOnly className="form-control-plaintext" value={userData.firstName} />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label fw-bold">Last Name</label>
                  <div className="col-sm-9">
                    <input type="text" readOnly className="form-control-plaintext" value={userData.lastName} />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label fw-bold">Username</label>
                  <div className="col-sm-9">
                    <input type="text" readOnly className="form-control-plaintext" value={userData.username} />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label fw-bold">Email</label>
                  <div className="col-sm-9">
                    <input type="text" readOnly className="form-control-plaintext" value={userData.email} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        
      )}
      {error && <p>Error: {error}</p>}
    </div>

  );
};

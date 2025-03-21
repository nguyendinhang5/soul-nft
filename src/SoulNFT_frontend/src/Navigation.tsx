import "./Navigation.scss";
import { Link } from "react-router-dom";
import { useAuth } from "./use-auth-client";
import { useNavigate } from "react-router-dom";

function Navigation() {
  const { isAuthenticated, login, logout, principal } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      {isAuthenticated && (
        <div className="principal">Logged in as: {principal?.toString()}</div>
      )}
      <div className="menu">
        <div className="menu-item">
          <Link to="/">My NFTs</Link>
        </div>
        {isAuthenticated && (
          <div className="menu-item">
            <Link to="/newNFT">Mint NFT</Link>
          </div>
        )}
        {!isAuthenticated ? (
          <div className="menu-item-button" onClick={login}>
            Sign in
          </div>
        ) : (
          <div
            className="menu-item-button"
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
            Sign Out
          </div>
        )}
      </div>
    </>
  );
}

export default Navigation;

import "./NFTForm.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SoulNFT_backend } from "../../declarations/SoulNFT_backend";
import { useAuth } from "./use-auth-client";

function CreateNFT() {
  const [imageUrl, setImageUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [lastError, setLastError] = useState<string | undefined>(undefined);

  const navigate = useNavigate();

  const { principal } = useAuth();

  const isValidImage = async (url: string) => {
    try {
      const response = await fetch(url, { method: "HEAD" });
      const contentType = response.headers.get("Content-Type");
      return Boolean(contentType && contentType.startsWith("image/"));
    } catch (error) {
      return false;
    }
  };

  const handleImageValidation = async () => {
    const valid = await isValidImage(imageUrl);
    setIsValid(valid);
  };

  useEffect(() => {
    if (!imageUrl) {
      return;
    }
    handleImageValidation();
  }, [imageUrl]);

  const handleMint = async () => {
    if (!isValid) {
      return;
    }
    setSaving(true);
    try {
      await SoulNFT_backend.mint(imageUrl);
      navigate("/");
    } catch (error: any) {
      const errorText: string = error.toString();
      setLastError(errorText);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mint-container">
      <h2>Mint Your NFT</h2>
      <input
        type="text"
        placeholder="Enter image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <button
        onClick={handleMint}
        disabled={saving || !isValid}
        style={{ opacity: saving || !isValid ? 0.5 : 1 }}
      >
        Mint NFT
      </button>
      {isValid === false && <p style={{ color: "red" }}>Invalid Image URL</p>}
      {isValid === true && <p style={{ color: "green" }}>Valid Image URL</p>}
      {imageUrl && isValid === true && (
        <div className="preview">
          <h4>Preview:</h4>
          <img src={imageUrl} alt="NFT Preview" />
        </div>
      )}
    </div>
  );
}

export default CreateNFT;

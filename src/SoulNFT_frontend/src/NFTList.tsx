import "./NFTList.scss";
import { useEffect, useState } from "react";
import { SoulNFT_backend } from "../../declarations/SoulNFT_backend";
import { useAuth } from "./use-auth-client";

type NFT = {
  id: bigint;
  URI: string;
};

function NFTList() {
  const [NFTs, setNFTs] = useState<NFT[]>([]);

  const { principal } = useAuth();

  const fetchNFT = async () => {
    if (!principal) {
      return;
    }
    const tokenIds = await SoulNFT_backend.ownerTokenIdentifiers(principal);
    const tokenURIs = await Promise.all(
      tokenIds.map((tokenId) => SoulNFT_backend.tokenURI(tokenId))
    );

    setNFTs(
      tokenIds.map(
        (tokenId, idx): NFT => ({ id: tokenId, URI: tokenURIs[idx][0]! })
      )
    );
  };

  useEffect(() => {
    fetchNFT();
  }, [principal]);

  if (!NFTs || NFTs.length === 0) {
    return <p>No NFTs found.</p>;
  }

  return (
    <div className="gallery-grid">
      {NFTs.map((nft) => (
        <div key={nft.id.toString()} className="nft-card">
          <img src={nft.URI} alt={`NFT ${nft.id}`} />
          <p># {nft.id.toString()}</p>
        </div>
      ))}
    </div>
  );
}

export default NFTList;

import fetch from "node-fetch";
import { getNFTsByOwner } from "./evm";
import { ArtworkNFT } from "./types";

const createGiftBox = async (
  recipient: {
    email: string;
    first_name: string;
    last_name: string;
  },
  artwork_nft: ArtworkNFT
) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "HVdFMEJcViKrIhvdfxfe3",
    },
    body: JSON.stringify({
      transfer_method: "NFTVault",
      has_sponsor: true,
      artworks: [
        {
          nft_contract: artwork_nft.contract,
          token_id: artwork_nft.token_id,
          source: artwork_nft.mediaUrl,
          source_metadata: artwork_nft.mediaMetadata,
          minted_on: new Date().toISOString(),

          artist_name: "Annibale Siconolfi",
          artist_description: "",
          artist_avatar:
            "https://ipfs.pixura.io/ipfs/QmaQhxcVm8GeCK9355qBxpEERXNe5avaLHbZwGnY3vhHJq/hidden%20city.jpg",
          artwork_name: "Demo Artwork name",
          artwork_description: "Demo Artwork description",

          type: artwork_nft.type,
          amount: 1,
        },
      ],
      gift_box: {
        note_subject: "To test",
        message: "Thank you for joining Gifted.art",
        message_bless: " ",
        signature: "—Gifted.art Team",
        wrapping: "Silver Elegance",
        note_style: "default",
        email_style: "default",
      },
      recipient,
    }),
  };

  const res = await fetch(
    "https://rest-api-staging.gifted.art/api/v1/contracts:createGiftBox",
    options
  );

  if (!res.ok) {
    const data = await res.json();
    console.error(res.statusText);
    console.error(JSON.stringify(data, null, 2));
    return;
  }

  console.log(await res.text());
};

const main = async () => {
  const nfts = await getNFTsByOwner({
    chain: "base-sepolia",
    owner: "0x642A0D79bc1842290ee0B893811b93c52c3A4A0F",
    // base-sepolia 1155
    contract: "0x2Faa4ff5Ee8D3D47915ABe87Ae44f550448A4CB0",
  });

  if (nfts.length === 0) {
    console.error("No NFTs found");
    return;
  }

  const recipient = {
    email: "test1@keyp.dev",
    first_name: "keyp",
    last_name: "test",
  };

  await createGiftBox(recipient, nfts[0]);
};

main().catch(console.error);

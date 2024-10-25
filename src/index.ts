import fetch from "node-fetch";
import { getNFTsByOwner } from "./evm";
import { ArtworkNFT } from "./types";

// Function to create a gift box
const createGiftBox = async (
  recipient: {
    email: string;
    first_name: string;
    last_name: string;
  },
  artwork_nft: ArtworkNFT
) => {

  const res = await fetch(
    // this is staging environment api, prod environment api is https://rest-api.gifted.art/api/v1/contracts:createGiftBox
    "https://rest-api-staging.gifted.art/api/v1/contracts:createGiftBox",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Using staging environment API key, if you want to use prod environment, you need to use prod API key
        "x-api-key": "HVdFMEJcViKrIhvdfxfe3",
      },
      body: JSON.stringify({
        transfer_method: "NFTVault",
        has_sponsor: true,
        artworks: [
          {
            // NFT-related information
            nft_contract: artwork_nft.contract,
            token_id: artwork_nft.token_id,
            source: artwork_nft.mediaUrl,
            source_metadata: artwork_nft.mediaMetadata,
            minted_on: new Date().toISOString(),

            // Artist and artwork information
            artist_name: "Annibale Siconolfi",
            artist_description: "",
            artist_avatar:
              "https://ipfs.pixura.io/ipfs/QmaQhxcVm8GeCK9355qBxpEERXNe5avaLHbZwGnY3vhHJq/hidden%20city.jpg",
            artwork_name: "Demo Artwork name",
            artwork_description: "Demo Artwork description",

            type: artwork_nft.type,
            // Only support 1, indicating one 1155/721 NFT
            amount: 1,
          },
        ],
        // Gift box configuration
        gift_box: {
          // Text display for corresponding positions on the page
          note_subject: "To test",
          message: "Thank you for joining Gifted.art",
          message_bless: " ",
          signature: "—Gifted.art Team",

          // UI-related configurations for the page
          // Wrapping animation, if you need more, please go to https://app.gifted.art/, follow the process to send a gift, and you can see more wrapping styles at the last step
          wrapping: "Silver Elegance",
        },
        recipient,
      }),
    }
  );

  if (!res.ok) {
    const data = await res.json();
    console.error(res.statusText);
    console.error(JSON.stringify(data, null, 2));
    return;
  }

  // return workflow id
  console.log(await res.text());
};

const main = async () => {
  // We fetched a random NFT from NFTVault here. You should mint and send your NFT into NFVault and then call gifted’s API to have it sent out.
  const nfts = await getNFTsByOwner({
    // Only supports base / base-sepolia, using base-sepolia for staging environment, use base for prod environment
    chain: "base-sepolia",
    // This is the NFTVault address, this is the test environment NFTVault address, we will provide the prod NFTVault address later
    owner: "0x642A0D79bc1842290ee0B893811b93c52c3A4A0F",
    // base-sepolia 1155 contract address (if you want to send 721 NFT, you need to use the 721 contract address)
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

// Execute the main function and catch any errors
main().catch(console.error);

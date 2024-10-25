import { Logger } from "@nestjs/common";
import fetch from 'node-fetch';

const logger = new Logger("Create Gift Box");

const main = async () => {
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
          nft_contract: "0x2Faa4ff5Ee8D3D47915ABe87Ae44f550448A4CB0",
          token_id: "14057",
          source:
            "https://cdn.simplehash.com/assets/a1e21dc031f882467dc02be85cbe55a0a86eb57529f0ee999f4aa745a08dac2d.mp4",
          source_metadata: {
            width: 406,
            height: 720,
            posterUrl:
              "https://cdn.simplehash.com/assets/a865e29a95ebf96de1950a0366b2ec88c4d1f337049744c538d5723064569db9.jpg",
            contentType: "video/mp4",
          },
          minted_on: "2024-10-25T09:00:58.502Z",
          artist_name: "About Sui Gaming",
          artist_avatar:
            "https://storage.googleapis.com/gifted-art/50f1c745-da71-4be0-be8b-8b8aeb31d707?GoogleAccessId=storage%40gifted-art.iam.gserviceaccount.com&Expires=3786912000&Signature=iNOdfJfMY8p%2BKIP4RS4z%2BJbozB2hulmD2kPdf3Hi4UFi2GxZxZk26DgbE5uCcJTR2ZaQh8%2FPF1bo4yHnq28ZXjzfAzhEbQ3Y%2F4nycNoZa0juUcTHweZoy9lMB3P%2F1fjmLyJzvQTDWcqjm3cqJ%2BCP8aeaI6GydXn%2FfyjZqcg8MFDpOt3e%2F0mhrRDsnqDcLmrkiCeAZKuCEGSa%2FO2xlvrUlSdBDeXzNgWWhOf1MLg2qRJ8vNbXgRyyLkXQEtWuUuthp0kEMbm%2B6EyJXAy7DcFM7p59FrtoUWAgAnovXgJEgxspxDmLHIqc%2BbJCglU%2Bfp9MYJWDxNGnXpAuRQ79r62zFA%3D%3D",
          artist_description:
            "**Team Liquid**\nCompeting across multiple game titles, Team Liquid is the winningest organization in all of esports and a world leader in viewership and fan engagement.\n\n**XOCIETY**\nXOCIETY, a POP Shooter with RPG progression, aims to redefine gaming experiences offering players economic control, transforming them into key decision-makers.\n \n**Pebble City**\nPebble City, the next-gen web3 social casino game where new ways of winning await.\nImmerse yourself in Pebble City’s vibrant metropolis, and delight in the variety of high-quality games.\n\n**DARKTIMES**\nSet in an ominous, Nordic-inspired medieval environment, DARKTIMES is a free-to-play Brawler Royale with a physics-based combat system. Fight friend and foe for survival in the high-stakes, winner-takes-all world. \n\n**E4C: Final Salvation**\nE4C: Final Salvation is a Web3 gaming metaverse set in the near future. E4C provides players with a revolutionary high-intensive, strategy-focused team fight and Esports-integrated gameplay experience.\n",
          artwork_name: "Sui x KBW Seoul 2024",
          artwork_description:
            "**Team Liquid Crest**\nOne of the most iconic and recognizable logos in all of esports. Let’s Go Liquid!\n\n**Red from XOCIETY**\nThe star of XOCIETY, an AAA Pop Shooter with RPG Progression.\n\n**Jackpot Planet from Pebble City**\nPebble City offers you the chance to own your part of a digital casino. Jackpot Planet is an artistic representation of the Pebble City Casino Membership NFT.\n\n**The Mammoth from DARKTIMES**\nMassive, often angry, always up for a good ol' brawl. His only true loves are his Greataxe and a tankard full of ale.\n\n**Kavi from E4C: Final Salvation**\nYou can't run, and you can't hide. Kavi's locked and loaded, ready for a fight. Prepare to shock and awe when Kavi joins E4C: Final Salvation!\n",
          type: "ERC1155",
          amount: 1,
        },
      ],
      gift_box: {
        note_subject: "To test",
        message:
          "Thank you for joining Sui at Korea Blockchain Week. As a token of our appreciation, we’re delighted to present you with a commemorative NFT featuring Sui’s most anticipated games. Here’s your little piece of Sui and KBW to keep with you at all times!\n\n\n\nReady / Sui // Play!",
        message_bless: " ",
        signature: "—Sui Team",
        wrapping: "Ready Sui Play",
        email_style: "generative_goods",
      },
      recipient: {
        email: "test1@keyp.dev",
        first_name: "test",
        last_name: "test",
      },
    }),
  };

  const res = await fetch(
    "https://rest-api-staging.gifted.art/api/v1/contracts:createGiftBox",
    options
  );

  const data = await res.json();

  if (!res.ok) {
    logger.error(res.statusText);
    logger.error(JSON.stringify(data, null, 2));
    return;
  }

  logger.log(data);
};

main().catch(console.error);

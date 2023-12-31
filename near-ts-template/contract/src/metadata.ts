import { near } from "near-sdk-js";
import { NFTContract } from "./contract";

export class NFTContractMetadata {
    spec: string;
    name: string;
    symbol: string;
    icon?: string;
    base_uri?: string;
    reference?: string;
    reference_hash?: string;

    constructor(
        {
            spec, 
            name, 
            symbol, 
            icon, 
            baseUri, 
            reference, 
            referenceHash
        }:{ 
            spec: string, 
            name: string, 
            symbol: string, 
            icon?: string, 
            baseUri?: string, 
            reference?: string, 
            referenceHash?: string
        }) {
        this.spec = spec  // required, essentially a version like "nft-1.0.0"
        this.name = name  // required, ex. "Mosaics"
        this.symbol = symbol // required, ex. "MOSAIC"
        this.icon = icon // Data URL
        this.base_uri = baseUri // Centralized gateway known to have reliable access to decentralized storage assets referenced by `reference` or `media` URLs
        this.reference = reference // URL to a JSON file with more info
        this.reference_hash = referenceHash // Base64-encoded sha256 hash of JSON from reference field. Required if `reference` is included.
    }
}

export class TokenMetadata {
    title?: string;
    description?: string;
    media?: string;
    media_hash?: string;
    copies?: number;
    issued_at?: string;
    expires_at?: string;
    starts_at?: string;
    updated_at?: string;
    extra?: string;
    reference?: string;
    reference_hash?: string;

    constructor(
        {
            title, 
            description, 
            media, 
            mediaHash, 
            copies, 
            issuedAt, 
            expiresAt, 
            startsAt, 
            updatedAt, 
            extra, 
            reference, 
            referenceHash
        }:{
            title?: string, 
            description?: string, 
            media?: string, 
            mediaHash?: string, 
            copies?: number, 
            issuedAt?: string, 
            expiresAt?: string, 
            startsAt?: string, 
            updatedAt?: string, 
            extra?: string, 
            reference?: string, 
            referenceHash?: string}
        ) {
        this.title = title // ex. "Arch Nemesis: Mail Carrier" or "Parcel #5055"
        this.description = description // free-form description
        this.media = media // URL to associated media, preferably to decentralized, content-addressed storage
        this.media_hash = mediaHash // Base64-encoded sha256 hash of content referenced by the `media` field. Required if `media` is included.
        this.copies = copies // number of copies of this set of metadata in existence when token was minted.
        this.issued_at = issuedAt // ISO 8601 datetime when token was issued or minted
        this.expires_at = expiresAt // ISO 8601 datetime when token expires
        this.starts_at = startsAt // ISO 8601 datetime when token starts being valid
        this.updated_at = updatedAt // ISO 8601 datetime when token was last updated
        this.extra = extra // anything extra the NFT wants to store on-chain. Can be stringified JSON.
        this.reference = reference // URL to an off-chain JSON file with more info.
        this.reference_hash = referenceHash // Base64-encoded sha256 hash of JSON from reference field. Required if `reference` is included.
    }
}

export class Token {
    owner_id: string;

    constructor({ ownerId}: { ownerId: string}) {
        this.owner_id = ownerId;
    }
}

export class JsonToken {
    token_id: string;
    owner_id: string;
    metadata: TokenMetadata;

    constructor({tokenId, ownerId, metadata}: { tokenId: string, ownerId: string, metadata: TokenMetadata }) {
        this.token_id = tokenId;
        this.owner_id = ownerId;
        this.metadata = metadata;
    }
}

export function internalNFTMetadata({ contract }: {contract: NFTContract}): NFTContractMetadata {
    // near.log(JSON.stringify(contract.metadata));
    return contract.metadata;
}
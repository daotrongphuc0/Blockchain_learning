import { NFTContract, NFT_METADATA_SPEC, NFT_STANDARD_NAME } from "./contract";
import { near, assert } from "near-sdk-js";
import { Token } from "./metadata";
import { internalAddTokenToOwner, internalRemoveTokenFromOwner } from "./internal";

//used to make sure the user attached exactly 1 yoctoNEAR
export function assertOneYocto() {         // 1 near = 10**24 yoctoNEAR
    assert(near.attachedDeposit().toString() === "1", "Requires attached deposit of exactly 1 yoctoNEAR");
}

/**
 * 1. Validate data  (dieu kien)
 * 2. Xoá owner hiện tại của NFT
 * 3. Thêm owner mới cho NFT
 * @param param0 
 */
export function internalNftTransfer({
    contract,
    receiverId,
    tokenId,
    memo
} : {
    contract: NFTContract,
    receiverId: string,
    tokenId: string,
    memo: string
}) {
    let token = contract.tokensById.get(tokenId) as Token;   // lay thong tin token
    let senderId = near.predecessorAccountId();

    if (token == null) {     // neu k tìm được token 
        near.panicUtf8("Not found token");  //báo lỗi
    }

    assert(senderId == token.owner_id, "Unauthorized")   // kiem tra nguoi gui co phai la nguoi so huu k
    assert(token.owner_id != receiverId, "The token owner and the receiver should be different");  // nguoi gui phai khac nguoi so huu

    internalRemoveTokenFromOwner(contract, token.owner_id, tokenId);
    internalAddTokenToOwner(contract, receiverId, tokenId);

    /// sua ng so huu token sau khi chuyen
    let newToken = new Token({   // tao moi
        ownerId: receiverId
    });

    contract.tokensById.set(tokenId, newToken);   // update cai moi thay cai cu

    /// hien thi ra memo
    if (memo != null) {
        near.log(`Memo: ${memo}`);
    }

    // Construct the transfer log as per the events standard.
    let nftTransferLog = {
        // Standard name ("nep171").
        standard: NFT_STANDARD_NAME,
        // Version of the standard ("nft-1.0.0").
        version: NFT_METADATA_SPEC,
        // The data related with the event stored in a vector.
        event: "nft_transfer",
        data: [
            {
                // The optional authorized account ID to transfer the token on behalf of the old owner.
                authorized_id: senderId,
                // The old owner's account ID.
                old_owner_id: token.owner_id,
                // The account ID of the new owner of the token.
                new_owner_id: receiverId,
                // A vector containing the token IDs as strings.
                token_ids: [tokenId],
                // An optional memo to include.
                memo,
            }
        ]
    }
    
    // Log the serialized json.
    near.log(JSON.stringify(nftTransferLog));

    return token;
}

export function internalOfferNftTransfer({  // chuyen NFT trong market
    contract,
    receiverId,
    senderId,
    tokenId,
    memo
} : {
    contract: NFTContract,
    receiverId: string,
    senderId: string,
    tokenId: string,
    memo: string
}) {
    let token = contract.tokensById.get(tokenId) as Token;

    if (token == null) {
        near.panicUtf8("Not found token");
    }

    assert(senderId == token.owner_id, "Unauthorized")
    assert(token.owner_id != receiverId, "The token owner and the receiver should be different");

    internalRemoveTokenFromOwner(contract, token.owner_id, tokenId);
    internalAddTokenToOwner(contract, receiverId, tokenId);

    let newToken = new Token({
        ownerId: receiverId
    });

    contract.tokensById.set(tokenId, newToken);

    if (memo != null) {
        near.log(`Memo: ${memo}`);
    }

    // Construct the transfer log as per the events standard.
    let nftTransferLog = {
        // Standard name ("nep171").
        standard: NFT_STANDARD_NAME,
        // Version of the standard ("nft-1.0.0").
        version: NFT_METADATA_SPEC,
        // The data related with the event stored in a vector.
        event: "nft_transfer",
        data: [
            {
                // The optional authorized account ID to transfer the token on behalf of the old owner.
                authorized_id: senderId,
                // The old owner's account ID.
                old_owner_id: token.owner_id,
                // The account ID of the new owner of the token.
                new_owner_id: receiverId,
                // A vector containing the token IDs as strings.
                token_ids: [tokenId],
                // An optional memo to include.
                memo,
            }
        ]
    }
    
    // Log the serialized json.
    near.log(JSON.stringify(nftTransferLog));

    return token;
}
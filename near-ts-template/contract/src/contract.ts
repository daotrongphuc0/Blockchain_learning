import { NearBindgen, near, call, view,LookupMap, UnorderedMap,initialize } from 'near-sdk-js';
import { NFTContractMetadata,JsonToken, internalNFTMetadata } from './metadata';
import { internalNftTokens, internalNFTTotalSupply, internalSupplyForOwner, internalTokensForOwner } from './enummeration';

/// This spec can be treated like a version of the standard.
export const NFT_METADATA_SPEC = "nft-1.0.0";

/// This is the name of the NFT standard we're using
export const NFT_STANDARD_NAME = "nep171";


@NearBindgen({})
export class NFTContract {
  owner_id : string;  // nguoi so huu
  tokensPerOwner: LookupMap;   // danh sach token cua owner id
  tokensById: LookupMap;  //  id cua token
  tokenMetadataById: UnorderedMap; 
  metadata: NFTContractMetadata;    // thong tin bo sung cho Nft vd mausac kich thuoc

  constructor({owner_id,metadata = {
    spec: "nft-1.0.0",
    name: "PTIT Tutorial Contract",
    symbol: "PTIT-NFT",
  }}){
    this.owner_id = owner_id;
    this.tokensPerOwner = new LookupMap("tokensPerOwner");
    this.tokensById = new LookupMap("tokensById");
    this.tokenMetadataById = new UnorderedMap("tokenMetadataById");
    this.metadata = metadata;
  }

  @initialize({privateFunction: true})
    init({owner_id}: {owner_id: string}) {
        this.owner_id = owner_id;
    }

  //mint nft
  @call({payableFunction:true})
  nft_min({token_id, metadata, receiver_id} ):void{

  }
  @view({})
  nft_token({token_id}: {token_id: string}): JsonToken {
    return null;
  }
  @call({payableFunction:true})
  nft_transfer({receiver_id, token_id, approval_id, memo}: {
    receiver_id: string,
    token_id: string,
    approval_id: number|null,
    memo: string|null}) {    // memo la ghi chu them de sau nay doc lai hieu mh da lam gi

  }
  @call({payableFunction:true})
  nft_transfer_call({receiver_id, token_id, approval_id, memo, msg}: {
    receiver_id: string,
    token_id: string,
    approval_id: number|null,
    memo: string|null,
    msg: string,    // msg la  tin nhan thong bao
  }): void {

  }
  @call({privateFunction:true})
  nft_resolve_transfer({owner_id, receiver_id, token_id, approved_account_ids}: {
    owner_id: string,
    receiver_id: string,
    token_id: string,
    approved_account_ids: null|Record<string, number>
  }): void {}


  // enummeration
  @view({})
    nft_total_supply(): number {
        return internalNFTTotalSupply({contract: this});
    }

    @view({})
    nft_tokens({from_index, limit}: { from_index: string | null, limit: number }): JsonToken[] {
        return internalNftTokens({contract: this, fromIndex: from_index, limit});
    }

    @view({})
    nft_supply_for_owner({account_id}: {account_id: string}): number {
        return internalSupplyForOwner({contract: this, accountId: account_id});
    }

    @view({})
    nft_tokens_for_owner({account_id, from_index, limit}: { account_id: string, from_index: string, limit: number }): JsonToken[] {
        return internalTokensForOwner({contract: this, accountId: account_id, fromIndex: from_index, limit});
    }

    @view({})
    nft_metadata(): NFTContractMetadata {
        return internalNFTMetadata({contract: this});
    }

}
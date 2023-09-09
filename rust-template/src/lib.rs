use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::LookupMap;
use near_sdk::;


///
/// voting con tract
/// - cho phep user tao poll voi nhieu option
/// cho phep mooi user cho optio
/// lay thong ton poll
/// lay thong tin ket qua vote



pub type PollId = String;
pub type OptionId = String;

mod vote;
pub use vote::*;
// Anotation(rust:macro) - danh dau dau la struc, dau la contract
#[near_bindgen]
#[derive(PanicOnDefault, BorshDeserialize, BorshSerialize)] // luu tren blockchan bang binary
pub struct VotingContract {
    // state contrat
    pub polls: LookupMap<PollId, Poll>,
    pub results: LookupMap<PollId,VotingResult>,
    pub next_pill_id:u64
}

#[near_bindgen]
impl Contract {
    // ADD CONTRACT METHODS HERE
}

/*
 * the rest of this file sets up unit tests
 * to run these, the command will be:
 * cargo test --package rust-template -- --nocapture
 * Note: 'rust-template' comes from Cargo.toml's 'name' key
 */

// use the attribute below for unit tests
#[cfg(test)]
mod tests {
    use super::*;
    use near_sdk::test_utils::{get_logs, VMContextBuilder};
    use near_sdk::{testing_env, AccountId};

    // part of writing unit tests is setting up a mock context
    // provide a `predecessor` here, it'll modify the default context
    fn get_context(predecessor: AccountId) -> VMContextBuilder {
        let mut builder = VMContextBuilder::new();
        builder.predecessor_account_id(predecessor);
        builder
    }

    // TESTS HERE
}

#![no_std]
use soroban_sdk::{contract, contractimpl, Address, Env, String, Symbol, Vec, Map, Error};

#[contract]
pub struct ReadingTracker;

#[contractimpl]
impl ReadingTracker {
    /// Complete a book for a reader
    /// Saves the book title and increments the reader's book count
    pub fn complete_book(env: Env, reader: Address, book_title: String) -> Result<(), Error> {
        // Get current book count for this reader
        let current_count = Self::get_total_books(env.clone(), reader.clone());
        
        // Increment the count
        let new_count = current_count + 1;
        
        // Store the new count
        let count_key = Symbol::new(&env, "book_count");
        env.storage().persistent().set(&(count_key, reader.clone()), &new_count);
        
        // Store the last book title
        let last_book_key = Symbol::new(&env, "last_book");
        env.storage().persistent().set(&(last_book_key, reader.clone()), &book_title);
        
        // Increment global count
        let global_key = Symbol::new(&env, "global_count");
        let global_count: u32 = env.storage().persistent().get(&global_key).unwrap_or(0);
        env.storage().persistent().set(&global_key, &(global_count + 1));
        
        Ok(())
    }
    
    /// Get total books read by a specific reader
    pub fn get_total_books(env: Env, reader: Address) -> u32 {
        let count_key = Symbol::new(&env, "book_count");
        env.storage().persistent().get(&(count_key, reader)).unwrap_or(0)
    }
    
    /// Get the last book title read by a specific reader
    pub fn get_last_book(env: Env, reader: Address) -> String {
        let last_book_key = Symbol::new(&env, "last_book");
        env.storage().persistent().get(&(last_book_key, reader)).unwrap_or(String::new(&env))
    }
    
    /// Get global count of all books read by all users
    pub fn get_global_count(env: Env) -> u32 {
        let global_key = Symbol::new(&env, "global_count");
        env.storage().persistent().get(&global_key).unwrap_or(0)
    }
}

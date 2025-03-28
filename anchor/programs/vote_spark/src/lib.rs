#![allow(unexpected_cfgs)]

use anchor_lang::prelude::*;

declare_id!("BBU4VxxYCUHRBDEuVSGjpmz7G3q3HdE2rdaitFYWs47W");

const MAX_OPTION: usize = 4;
const MAX_TITLE_LEN: usize = 280;
const MIN_TITLE_LEN: usize = 10;



#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct OptionItem {
    pub id: u8,
    pub label: String,
    pub value: u64,
}

#[error_code]
pub enum PollError {
    #[msg("Invalid Option Index")]
    InvalidOption,
    #[msg("Poll Has Expired")]
    PollExpired,
    #[msg("Poll Title Too Short")]
    TitleTooShort,
    #[msg("Poll Title Too Long")]
    TitleTooLong,
    #[msg("Too Many Poll Options")]
    TooManyOptions,
    #[msg("Duplicate Vote Detected")]
    DuplicateVote,
}


#[program]
mod vote_spark {
    use super::*;

    pub fn initialize_poll(
        ctx: Context<InitializePoll>,
        poll_id: u8,
        end_time: i64,
        created_at: i64,
        options: Vec<OptionItem>,
        title: String,
    ) -> Result<()> {
        // Additional validations
        require!(title.len() >= MIN_TITLE_LEN, PollError::TitleTooShort);
        require!(title.len() <= MAX_TITLE_LEN, PollError::TitleTooLong);
        require!(options.len() <= MAX_OPTION, PollError::TooManyOptions);

        // Validate unique option labels
        let unique_labels = options
            .iter()
            .map(|opt| &opt.label)
            .collect::<std::collections::HashSet<_>>();
        require!(
            unique_labels.len() == options.len(),
            PollError::InvalidOption
        );

        ctx.accounts.poll.set_inner(Poll {
            creator: ctx.accounts.creator.key(),
            poll_id,
            end_time,
            created_at,
            options,
            title,
        });
        Ok(())
    }

    pub fn remove_poll(_ctx: Context<RemovePoll>, poll_id: u8) -> Result<()> {
        msg!("Removing poll {}", { poll_id });
        Ok(())
    }

    pub fn vote_poll(ctx: Context<VotePoll>, _poll_id: u8, option_index: u8) -> Result<()> {
        let clock = Clock::get()?;
        let current_timestamp = clock.unix_timestamp;

        // Check if poll is still active
        require!(
            current_timestamp <= ctx.accounts.poll.end_time,
            PollError::PollExpired
        );

        // Validate option index
        require!(
            (option_index as usize) < ctx.accounts.poll.options.len(),
            PollError::InvalidOption
        );

        // Increment vote count
        ctx.accounts.poll.options[option_index as usize].value += 1;

        Ok(())
    }
}


#[derive(Accounts)]
#[instruction(poll_id:u8)]
pub struct InitializePoll<'info> {
    #[account(mut)]
    pub creator: Signer<'info>,

    #[account(
        init,
        payer = creator,
        space = Poll::MAX_SIZE,
        seeds = [
            b"poll", 
            creator.key().as_ref(), 
            &[poll_id]
        ],
        bump
    )]
    pub poll: Account<'info, Poll>,

    pub system_program: Program<'info, System>,
}


#[derive(Accounts)]
#[instruction(poll_id:u8)]
pub struct RemovePoll<'info> {
    #[account(mut)]
    pub creator: Signer<'info>,

    #[account(
        mut,
        close=creator,
        seeds=[b"poll",creator.key().as_ref(),&[poll_id]],
        bump
    )]
    pub poll: Account<'info, Poll>,

    pub system_program: Program<'info, System>,
}


#[derive(Accounts)]
#[instruction(poll_id:u8, option_index:u8)]
pub struct VotePoll<'info> {
    #[account(mut)]
    pub user: Signer<'info>,

    #[account(
        mut,
        seeds = [
            b"poll", 
            poll.creator.as_ref(), 
            &[poll.poll_id]
        ],
        bump
    )]
    pub poll: Account<'info, Poll>,

    #[account(
        init,
        payer = user,
        space = Vote::MAX_SIZE,
        seeds = [
            b"vote", 
            user.key().as_ref(), 
            poll.creator.as_ref(),
            &[poll_id]
        ],
        bump
    )]
    pub vote: Account<'info, Vote>,

    pub system_program: Program<'info, System>,
}

#[account]
pub struct Poll {
    pub creator: Pubkey,
    pub poll_id: u8,
    pub title: String,
    pub options: Vec<OptionItem>,
    pub created_at: i64,
    pub end_time: i64,
}

impl Poll {
    /// Calculate the max space needed for storing a poll.
    pub const MAX_SIZE: usize = 8  // Anchor account discriminator
        + 32  // Pubkey (creator)
        + 1   // Poll id (u8)
        + 4 + MAX_TITLE_LEN  // String (title) => 4 bytes for length + content
        + 4 + (MAX_OPTION * (4 + MAX_TITLE_LEN + 8))  // Vec<OptionItem>: 4 bytes for length + (each option: 4 bytes for string length + MAX_TITLE_LEN + 8 bytes for u64)
        + 8  // created_at (i64)
        + 8; // end_time (i64)
}

#[account]
pub struct Vote {
    pub user: Pubkey,     // Voter's address
    pub poll_id: u8,      // The poll being voted on
    pub option_index: u8, // The option the user voted for
}

impl Vote {
    pub const MAX_SIZE: usize = 8 + 32 + 1 + 1; // 8 (discriminator) + 32 (Pubkey) + 1 (poll_id) + 1 (option_index)
}

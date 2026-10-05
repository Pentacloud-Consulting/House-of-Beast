## Event taxonomy (Module 16)

- Use **verb_noun** names: `signup_completed`, `checkout_abandoned`, `feature_viewed`
- Required properties:
  - `session_id`
  - `timestamp`
  - `page_url`
  - `user_id` (if authenticated)
- Prefer server-side tracking where possible (adblock-resistant)


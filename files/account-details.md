# Account Details

What are the current account details? 

{% ai #accountDetails /%}

Check the ETH balance of the account.

{% ai #accountDetails structuredOutputs="{balance: number}" /%}

The user's balance is {% $accountDetails.structuredOutputs.balance %}

{% if equals($accountDetails.structuredOutputs.balance, 0) %}

    The user has no balance. He may need to buy or request some tokens from the faucet.

    Let's request some tokens from the faucet.

    {% ai /%}

    {% else /%}

    The user has a balance of {% $accountDetails.structuredOutputs.balance %}.

{% /if %}

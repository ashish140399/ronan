import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Prism from 'prismjs';


const BlogOne = () => {
    const code1 = `contract Executor {
        function execute(address to, bytes calldata data, uint256 gas) external {
            (bool success, bytes memory returnData) = to.call.gas(gas)(data);
            // do something
        }
    }`;
    const html1 = Prism.highlight(code1, Prism.languages.javascript, 'javascript');
  return (
    <>
        <Navbar subpage="Ethereum, The Concept of Gas and its Dangers"/>
{/* {html1} */}
        <div className="relative py-16 bg-black overflow-hidden">
    <div
        className="hidden lg:block lg:absolute lg:inset-y-0 lg:h-full lg:w-full"
    >
        <div
            className="relative h-full text-lg max-w-prose mx-auto"
            aria-hidden="true"
        >
            <svg
                className="absolute top-12 left-full transform translate-x-32"
                width="404"
                height="384"
                fill="none"
                viewBox="0 0 404 384"
            >
                <defs>
                    <pattern
                        id="74b3fd99-0a6f-4271-bef2-e80eeafdf357"
                        x="0"
                        y="0"
                        width="20"
                        height="20"
                        patternUnits="userSpaceOnUse"
                    >
                        <rect
                            x="0"
                            y="0"
                            width="4"
                            height="4"
                            className="text-gray-800"
                            fill="currentColor"
                        ></rect>
                    </pattern>
                </defs>
                <rect
                    width="404"
                    height="384"
                    fill="url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)"
                ></rect>
            </svg>
            <svg
                className="absolute top-1/2 right-full transform -translate-y-1/2 -translate-x-32"
                width="404"
                height="384"
                fill="none"
                viewBox="0 0 404 384"
            >
                <defs>
                    <pattern
                        id="f210dbf6-a58d-4871-961e-36d5016a0f49"
                        x="0"
                        y="0"
                        width="20"
                        height="20"
                        patternUnits="userSpaceOnUse"
                    >
                        <rect
                            x="0"
                            y="0"
                            width="4"
                            height="4"
                            className="text-gray-800"
                            fill="currentColor"
                        ></rect>
                    </pattern>
                </defs>
                <rect
                    width="404"
                    height="384"
                    fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)"
                ></rect>
            </svg>
            <svg
                className="absolute bottom-12 left-full transform translate-x-32"
                width="404"
                height="384"
                fill="none"
                viewBox="0 0 404 384"
            >
                <defs>
                    <pattern
                        id="d3eb07ae-5182-43e6-857d-35c643af9034"
                        x="0"
                        y="0"
                        width="20"
                        height="20"
                        patternUnits="userSpaceOnUse"
                    >
                        <rect
                            x="0"
                            y="0"
                            width="4"
                            height="4"
                            className="text-gray-800"
                            fill="currentColor"
                        ></rect>
                    </pattern>
                </defs>
                <rect
                    width="404"
                    height="384"
                    fill="url(#d3eb07ae-5182-43e6-857d-35c643af9034)"
                ></rect>
            </svg>
        </div>
    </div>
    <div className="relative px-4 sm:px-6 lg:px-8">
        <div className="text-lg max-w-prose prose prose-dark mx-auto">
            <h1
                className="text-xl font-black max-w-prose mx-auto block tracking-wide uppercase"
            >
                Ethereum, The Concept of Gas and its Dangers
            </h1>
            <p className="mt-8 text-xl text-gray-300 leading-8">2/28/2020</p>
        </div>
        <div className="mt-6 prose prose-dark prose-lg text-gray-300 mx-auto">
            <img
                src="/images/blog/gas-1000.jpg"
                className="full-bleed"
                alt="Banner"
            />
        
            <p>
                Hi, I am back with an article on Ethereum. We’ll explore the
                concept of gas and explain how it behaves and show what its
                sometimes, subtle behaviour actually implies.
            </p>
            <p>
                It turns out that almost every Smart Contract Accounts and Meta
                Transaction implementations so far fail to consider the specific
                rules of gas when calling other contracts and are thus
                <strong>vulnerable to malicious relayers</strong>.
            </p>
            <p>
                To make matter worse, with the addition of “try/catch” in
                solidity 0.6, it is now even easier to expose contracts to a
                type of attack that share similarity to the infamous
                <strong>Call Depth Attack</strong> and seems to have never been
                discussed before nor been listed in attack vector listing like
                <a href="https://swcregistry.io" rel="nofollow"
                    >the Smart Contract Weakness Registry</a
                >.
            </p>
            <p>
                Indeed, the Ethereum community is yet to be fully aware of some
                of the pitfalls associated with Ethereum’s gas behaviour.
            </p>
            <p>
                I hope this article will help shade some light on a core aspect
                of Ethereum smart contract development and hopefully help
                improve the situation.
            </p>
            <p>
                If you are short on time, the crux of the article is that the
                current ethereum gas behaviour, including how gas is given to
                other contract via the various CALL* opcodes is not intuitive
                and can cause security issues in some situation, like
                meta-transactions. Plus contracts calling other contracts cannot
                be sure that the contracts they call reverted because of a lack
                of gas or simply because they intentionally reverted, not unlike
                the infamous “call depth attack”.
            </p>
            <p>
                Let’s start with the basics. If you are already familiar with
                gas on ethereum you can skip to
                <a
                    href="javascript:;"
                    >2. Gas And Contracts Calls</a
                >.
            </p>
            <h2 id="1-what-is-gas">
                <a href="#1-what-is-gas" aria-hidden="true" tabIndex={0}
                    ><span className="icon icon-link"></span></a
                >1. What Is Gas?
            </h2>
            <p>
                In a nutshell, gas is the measure of the computational resources
                used by the operations performed on the Ethereum network
                (including storage of data, temporary memory manipulation and
                operation like multiplication, hashing, etc…).
            </p>
            <p>
                When a user submit a transaction on the Ethereum network, it
                needs to pay for the sum of all the operations its transaction
                performs so that it rewards the miner/validator that performs
                the operation and makes it prohibitively expensive to make a
                denial of service attack on the network. For a basic Ethereum
                transfer it costs for example 21,000 gas, but more complex
                operations can cost millions of gas.
            </p>
            <p>
                Since Ethereum is
                <a
                    href="https://en.wikipedia.org/wiki/Turing_completeness"
                    rel="nofollow"
                    >Turing complete</a
                >
                (it can perform any kind of computation given infinite resources
                but exhibit the
                <a
                    href="https://en.wikipedia.org/wiki/Halting_problem"
                    rel="nofollow"
                    >halting problem</a
                >), the miners/validators (those that decide what transactions
                are included on the Ethereum network) can’t know the total cost
                of operations of the transaction without executing it first (in
                which case they would need to be rewarded for it, else the abuse
                would be trivial). The user (transaction’s signer) need to set a
                gas value representing the maximum gas they expect their
                transaction to use, this is usually called the transaction’s
                <code>gasLimit</code> (though it is sometime called
                <code>startGas</code> or simply <code>gas</code>).
            </p>
            <p>
                If it turns out that the transaction being executed actually
                consumes more gas than specified by the <code>gasLimit</code>,
                the transaction’s operations are nullified (we usually refers to
                it as a <code>revert</code> or <code>throw</code> (when all gas
                of <code>gasLimit</code> is consumed, like here) and the node
                has to revert the state’s changes to ensure the transaction has
                no effects. If that happen, the transaction is still recorded
                and rewards the miner that included it, reducing the balance of
                the transaction’s sender accordingly.
            </p>
            <h3 id="gas-has-a-price">
                <a href="#gas-has-a-price" aria-hidden="true" tabIndex={0}
                    ><span className="icon icon-link"></span></a
                >Gas Has A Price
            </h3>
            <p>
                Now, the miners/validators do not get rewarded in gas unit, but
                in Ether (ETH), Ethereum native currency. Indeed, the gas value
                is only an abstract measure of the cost. It can only be paid
                directly in ETH. As such when users submit transactions, they
                also set a <code>gasPrice</code> they are willing to pay (per
                gas unit used) to get their transactions included. And so users,
                cannot emit transactions on the Ethereum network without owning
                some ETH, unless the <code>gasPrice</code> they set is zero (in
                which case miners would not be incentivised to include the
                transaction).
            </p>
            <p>
                It is worth noting that there are various efforts going on to
                solve this and allow users without ETH to interact with Ethereum
                through what is called “Meta Transactions”. It turns out, as we
                shall see later, that such solutions have potential issues with
                the behaviour of gas.
            </p>
            <p>
                When transactions are included on the network, they are included
                in batches, called blocks. And to ensure that most modern
                computer can handle the network (so that the network remain
                decentralised and not just in the trust of powerful computers),
                there is a limit of the amount of gas that can be used in a
                block. This, in turn, limits the number of transactions in a
                block.
            </p>
            <p>
                As such, users compete for the inclusion of their transaction
                and so the average price of the gas on Ethereum is set by the
                market: users compete for transaction inclusion and
                miners/validators pick the one that give more reward first
                (higher <code>gasPrice</code>).
            </p>
            <h3 id="gas-refund">
                <a href="#gas-refund" aria-hidden="true" tabIndex={0}
                    ><span className="icon icon-link"></span></a
                >Gas Refund
            </h3>
            <p>While the cost in ETH of a transaction is computed as follow</p>
            <pre
                className="language-undefined"
            ><code className="language-undefined">transaction cost = gasUsed * gasPrice</code></pre>
            <p>It is slightly more complicated than you might think.</p>
            <p>
                Indeed, certain operations actually give a refund and that
                refund is only deduced <strong>after</strong> the transaction is
                done. This means that the <code>gasUsed</code> can actually be
                smaller than the <code>gasLimit</code> required to be given for
                the transaction to succeed. A more accurate equation is thus as
                follow:
            </p>
            <pre
                className="language-undefined"
            ><code className="language-undefined">transaction cost = (gasRequired - gasRefund) * gasPrice</code></pre>
            <p>
                where <code>gasRequired</code> is the minimum gas value that was
                required to be provided via <code>gasLimit</code> in order for
                the transaction to succeed (and not run out of gas) and
                <code>gasRefund</code> is the total amount of refund given as
                part of the execution of that transaction. An example of
                operation that gives a refund is operation that reset storage to
                zero values. This is to encourage contract developer to reduce
                storage space as this can reduce the overall cost of their
                operations.
            </p>
            <h3 id="gas-cost-vs-real-cost">
                <a
                    href="#gas-cost-vs-real-cost"
                    aria-hidden="true"
                    tabIndex={0}
                    ><span className="icon icon-link"></span></a
                >Gas Cost VS Real Cost
            </h3>
            <p>
                We have thus seen that every operation performed on the Ethereum
                network costs an amount of computational resources and this is
                accounted for with a gas cost (which itself have an average
                price in ETH (currently around 0.000000001 ETH (or ~ $0.0000001)
                per gas unit)). The goal of such system it to try to be as
                accurate as possible with the actual resource cost of performing
                that operation on a computer so that no abuse of the network is
                possible without paying the true cost of it.
            </p>
            <p>
                The gas cost is obviously not completely accurate for few
                reasons: implementation differences between nodes, differences
                in hardware and the intrinsic differences in operation cost
                based on their inputs. Furthermore, as the gas measure is a one
                dimensional value, differences between storage of value for long
                term, reading from memory and an operation like addition use the
                same metric which is not how a computer would normally perform.
            </p>
            <p>
                Plus, as highlighted by the change in opcode pricing over time,
                the cost of each operation can change. It is also dependent on
                the state of Ethereum. Most notably, the latest opcode pricing
                changes like
                <a href="https://eips.ethereum.org/EIPS/eip-1884" rel="nofollow"
                    >EIP-1884</a
                >
                that make reading from storage 4 x more expensive was due to the
                realisation that as the Ethereum state size grew, it became more
                expensive to retrieve data from storage. The opcode gas pricing
                had to reflect that in order for the Ethereum network to remain
                protected from denial of service (DOS) attacks.
            </p>
            <p>
                It is also worth noting that the gas pricing model currently
                used by Ethereum might be vulnerable to specially crafted smart
                contract that exploit the limited accuracy of the pricing. See
                for example the research done on
                <a href="https://arxiv.org/pdf/1909.07220.pdf" rel="nofollow"
                    >“Resource Exhaustion Attack”</a
                >
                by Daniel Perez and Benjamin Livshits with genetic algorithms to
                craft smart contracts whose execution is relatively cheap on gas
                compared to how expensive they are for the network to compute.
            </p>
            <p>
                Nevertheless, the current gas opcode pricing provide a good
                ballpark representation of the cost of the operation your smart
                contract will perform and even if the gas cost can and will
                change the order of magnitude should remain the same.
            </p>
            <p>
                As a smart contract developer you should never assume specific
                opcode pricing in your smart contract and your code should thus
                remain independent of it. Unfortunately it is still not too
                uncommon to see smart contract developers hard-coding gas value
                in their contract, please do not emulate them.
            </p>
            <h3 id="gas-estimation">
                <a href="#gas-estimation" aria-hidden="true" tabIndex={0}
                    ><span className="icon icon-link"></span></a
                >Gas Estimation
            </h3>
            <p>
                While smart contract developers can sometime have a good idea of
                how much gas is required to perform their contract operations,
                it is in many cases dependent on the inputs and the current
                state. As such Ethereum nodes provide a mechanism for users to
                estimate the gas required for a particular transaction. The
                applications’ front-end can thus perform these estimate to
                ensure enough (and not too much) gas is provided as
                <code>gasLimit</code> for the actual transaction. (Note that it
                is important to ensure <code>gasLimit</code> is not too high as
                this can delay the inclusion of the transaction, since it is
                easier to pack smaller transactions in and miner wants to
                maximise the use of a block. It is also nice for the user to let
                them know as accurately as possible the cost of the
                transaction).
            </p>
            <p>
                The front-end would thus basically make a call to the users’s
                node or wallet with the exact parameters it will use for the
                real transaction. The node will execute the code without
                broadcasting anything to other node and return the
                <code>gasRequired</code> for the transaction to succeed.
            </p>
            <p>
                Unfortunately as of today, the nodes have no better way than
                using a binary search to find the proper estimation. This means
                the node will sometime need to execute the code 20 times or more
                to find the minimum required gas. And even then, it could miss
                if the contract had for some reason, branching logic dependent
                on the gas available (unlikely but technically possible).
            </p>
            <p>
                We should actually be able to improve the situation by giving
                node the ability to record max gas needed as they perform the
                operation. We could for example replace the gas opcode (which is
                normally used to be compared to some value) with a
                <code>requireGas</code> opcode that would register such gas
                need. Backward compatibility will limit the effectiveness of
                this strategy though. I have started to write a
                <a
                    href="https://github.com/ethereum/EIPs/pull/2075"
                    rel="nofollow"
                    >proposal</a
                >
                on this solution but need to continue working on it.
            </p>
            <p>
                Note though that whatever estimate is given, it might not be
                enough as for some contract operations, the gas cost can depend
                on other users changing the state. If these changes happen
                between the time of the estimation and the time at which the
                transaction is included in a block, the estimation will be
                incorrect. Similarly, an operation could be time/block dependent
                and the estimation could be off. As such front-end will usually
                add some extra gas to cover these cases. There are alternative
                mechanisms being researched too like
                <a href="https://arxiv.org/pdf/1910.02945.pdf" rel="nofollow"
                    >GasFuzz</a
                >.
            </p>
            <p>
                Smart contract developers can also help by designing contracts
                so that state changes can only decrease the gas cost for future
                user. This is not always possible or even desired though.
            </p>
            <h3 id="the-2300-gas-stipend">
                <a href="#the-2300-gas-stipend" aria-hidden="true" tabIndex={0}
                    ><span className="icon icon-link"></span></a
                >The 2300 Gas Stipend
            </h3>
            <p>
                Another particular behaviour that relates to gas is the gas
                stipend, that is extra gas given to recipient of ETH. So when a
                user’s transaction or a contract make a call to another address
                with an amount of ETH greater than zero, 2300 gas is added by
                the EVM to the gas passed to the destination. As such contracts
                receiving ETH, have the guarantee to have at least 2300 gas and
                can for example emit an event, but would have no guarantee to be
                able to write to storage and thus change state.
            </p>
            <p>
                In solidity, the <code>&lt;address&gt;.send</code> and
                <code>&lt;address&gt;.transfer</code> functions will not pass
                any more gas and as such these call only receive 2300 gas. This
                for example ensure they cannot call back in the caller contract
                and change state. They are thus safe from
                <a
                    href="https://consensys.github.io/smart-contract-best-practices/known_attacks/#reentrancy"
                    rel="nofollow"
                    >re-entrency attacks</a
                >. Plus as you shall see, they are safe from issues mentioned
                further down.
            </p>
            <h2 id="2-gas-and-contracts-calls">
                <a
                    href="#2-gas-and-contracts-calls"
                    aria-hidden="true"
                    tabIndex={0}
                    ><span className="icon icon-link"></span></a
                >2. Gas And Contracts Calls
            </h2>
            <p>
                We have so far, described what gas is on Ethereum and seen that
                every operation has a gas cost. One type of operation, the ones
                that call other contracts, is more complex in that it has
                special rules on how gas is given to called contracts and how
                “out of gas” or other failures are handled. As you should see,
                this has some important consequences.
            </p>
            <p>
                In Ethereum, a contract (referred here as the <em>caller</em>)
                can call other contracts (referred here as <em>callees</em>) via
                special opcodes (CALL, STATIC<em
                    >CALL, DELEGATE_CALL,…). When that happen, _callees</em
                >
                also receive an amount of gas as if they were called directly
                via a transaction. The gas provided is partially specified by
                the <em>caller</em> as part of the opcode parameters. See
                DELEGATE_CALL spec
                <a href="https://eips.ethereum.org/EIPS/eip-7" rel="nofollow"
                    >here</a
                >
                for example.
            </p>
            <p>
                If the amount received is not enough (the total gas cost of all
                operations executed by the <em>callee</em> exceeds the gas
                received), the <em>callee</em>’s operations get reverted and
                execution goes back to the <em>caller</em> as the result of an
                “out of gas” exception. While in most cases, (when developers
                use normal function calls in solidity), the
                <em>caller</em> automatically reverts when receiving such
                failure, the EVM and solidity actually allow the
                <em>caller</em> to continue (this is now becoming easier with
                <a
                    href="https://blog.ethereum.org/2020/01/29/solidity-0.6-try-catch/"
                    rel="nofollow"
                    >try/catch</a
                >
                functionality in solidity 0.6). The <em>caller</em> has then at
                its disposition, whatever gas is left (including what was not
                spent by the <em>callee</em>).
            </p>
            <p>
                The <em>callee</em> can also decide on its own to revert (revert
                its operations but return the unused gas) or throw (revert its
                operations and consume all gas given). This can be as a result
                of a specific error in which case the <em>callee</em> can
                specify an error message, or because it performed an invalid
                operation (like division by zero).
            </p>
            <p>
                <strong
                    >Note that Ethereum has no established convention on error
                    message yet and as such <em>caller</em> have usually no clue
                    of the reason why <em>callee</em> fails</strong
                >, unless both contracts were build for each other. In
                particular it cannot know whether the error was actually caused
                by not being given enough gas or for another reason.
            </p>
            <h3 id="the-164-rule">
                <a href="#the-164-rule" aria-hidden="true" tabIndex={0}
                    ><span className="icon icon-link"></span></a
                >The 1/64 Rule
            </h3>
            <p>
                While I mentioned that it is the <em>caller</em> who specify how
                much gas is given to <em>callee</em>, this is a bit more
                complex.
            </p>
            <p>
                In the current Ethereum version (post “Tangerine Whistle” hard
                fork that introduced
                <a href="https://eips.ethereum.org/EIPS/eip-150" rel="nofollow"
                    >EIP-150</a
                >), a <em>caller</em> can actually only give to a
                <em>callee</em>, an amount of gas no greater than:
            </p>
            <pre
                className="language-undefined"
            ><code className="language-undefined">gas available - (1/64* gas available)</code></pre>
            <p>
                This is because EIP-150 ensure the caller is left with at least
                1/64 of the gas available, regardless of what happens to the
                call.
            </p>
            <p>
                The reasoning behind the introduction of this 1/64 rule was to
                avoid the issue that previous implementation had: It used to be
                that <em>caller</em> could send all the gas currently available
                to them to the <em>callee</em>. But this implied that there
                could be contracts calling contracts, almost ad-infinitum (since
                the gas cost of a call is low). To ensure this did not cause
                “stack too deep” issue in Ethereum node’s implementation, the
                maximum depth was caped to 1024 (and still is). Upon reaching
                that depth, the last call would throw.
            </p>
            <p>
                The consequence was that transaction signers could ensure that a
                specific call would throw by first making the transaction go
                through a series of calls and make it reach the depth of 1023
                before calling a particular smart contract. This is known as the
                <strong>Call Depth Attack</strong>, see
                <a
                    href="https://blog.ethereum.org/2016/06/10/smart-contract-security/"
                    rel="nofollow"
                    >here</a
                >
                for an introduction.
            </p>
            <p>
                In practice it meant that in most cases you could not trust your
                <em>caller</em> contract to continue processing its logic after
                receiving a revert from a <em>callee</em>. And note that such
                issue also affected simple
                <code>&lt;address&gt;.send</code> call (that would normally get
                the guaranteed gas stipend).
            </p>
            <p>
                The solution to prevent this from happening, proposed first in
                <a
                    href="https://github.com/ethereum/EIPs/issues/114"
                    rel="nofollow"
                    >EIP-114</a
                >
                and finally accepted in
                <a href="https://eips.ethereum.org/EIPS/eip-150" rel="nofollow"
                    >EIP-150</a
                >
                is to always keep an amount of gas in the <em>caller</em>,
                specifically 1/64 of the available gas. Since at each extra
                depth level, the gas would diminish rapidly, the recursive depth
                would get limited naturally and while the 1024 limit still exist
                today in node implementation, it is for practical purpose
                unreachable.
            </p>
            <p>
                This was not the only change in EIP-150 though. The gas provided
                as part of the CALL* opcodes has changed from a strict value to
                <strong>a maximum value</strong>, that is, if
                <code>~ 63/64</code> of the available gas is less than the value
                given to the opcode, the call will still proceed but with less
                gas than specified, as opposed to reverting, like in previous
                implementations. One of the reasoning behind such change
                (proposed first in
                <a
                    href="https://github.com/ethereum/EIPs/issues/90"
                    rel="nofollow"
                    >EIP-90</a
                >
                ) was that it was redundant for the contract to calculate the
                gas required by a call and that it was important to protect the
                <em>caller</em> by preventing the <em>callees</em> from using
                all the gas (actually ~63/64 of it). There were propositions to
                have “give all available gas” as an option but in the end, the
                idea of having the gas value simply being a maximum was decided.
                See
                <a
                    href="https://github.com/ethereum/EIPs/issues/90"
                    rel="nofollow"
                    >this issue</a
                >
                for some of the discussion.
            </p>
            <p>
                The possibility of <em>proceed without enough gas</em> is
                something we do not naturally expect as developers and as you
                will see in the next section, it can lead to safety issues.
            </p>
            <p>
                Many projects out there are actually affected, including
                <a href="https://safe.gnosis.io" rel="nofollow">Gnosis Safe</a>
                and other smart contract wallet that support meta-transaction.
                This is also true of the
                <a href="https://gasstation.network" rel="nofollow"
                    >Gas Station Network (GSN)</a
                >
                by
                <a href="https://openzeppelin.com" rel="nofollow"
                    >OpenZeppelin</a
                >.
            </p>
            <h2 id="3-insufficient-gas-griefing-attack">
                <a
                    href="#3-insufficient-gas-griefing-attack"
                    aria-hidden="true"
                    tabIndex={0}
                    ><span className="icon icon-link"></span></a
                >3. Insufficient Gas Griefing Attack
            </h2>
            <p>
                As we should see, this was a mistake. Indeed, in some cases,
                <em>caller</em> contracts need to ensure that the
                <em>callee</em> receive a specific amount of gas. A feat, not
                perfectly achievable with current opcodes unless you let your
                contract be
                <strong>dependent on specific opcode pricing</strong>.
            </p>
            <p>Let’s look at an example of solidity code :</p>
            
            









            <p>
                If you were new to solidity, I am pretty sure you would expect
                that the <em>callee</em> (here <code>to</code>) should be
                certain to receive an amount of gas equal to <code>gas</code>.
                However, in the current EVM implementation, this only means that
                the <em>caller</em> is ensured to spend a maximum amount of gas
                equal to <code>gas</code>. In other words, the gas specified as
                parameter of the CALL* opcodes acts as a protection for the
                <em>caller</em> to not spend more than <code>gas</code> in the
                call.
                <strong
                    >The <em>callee</em>, on the other hand, is not guaranteed
                    to get any.</strong
                >
            </p>
            <p>
                Note that such behaviour is obviously different from the
                transaction’s <code>gasLimit</code> as in that latter case, the
                transaction is at least sure it will get that amount of gas.
            </p>
            <p>
                You might be thinking that if the <em>callee</em> run out of
                gas, then surely the <em>caller</em> will throw because no more
                gas would be left for it neither.
            </p>
            <p>
                That’s where the 1/64 rule, described above, kicks in. Since
                <code>gas/ 64</code> is left anyway in the <em>caller</em>, this
                could well be enough for it to carry its execution to the end.
                As such, even if the <em>callee</em> fails because it did not
                receive the expected <code>gas</code>, the <em>caller</em> would
                carry on potentially assuming that the <em>callee</em> failed
                for another reason than a lack of gas.
            </p>
            <p>
                By the way, 1/64 is not that small. If an inner call require
                6,400,000 gas, the <em>caller</em> would still have 100,000 gas
                to carry on after the <em>callee</em>’s call fails.
            </p>
            <p>
                As far as I know this vulnerability is not explained properly
                anywhere. Interestingly enough as I mentioned, it affects
                several projects already, including almost every smart contract
                wallet and meta-transaction implementation out there. It also
                affects EIP-165 (but to a less extent, because for practical
                purpose it might never matter) whose example implementation
                exemplify the issue, see
                <a
                    href="https://github.com/ethereum/EIPs/pull/881#issuecomment-491677748"
                    rel="nofollow"
                    >here</a
                >.
            </p>
            <p>
                It was first reported as part of a Gnosis Safe bug bounty on
                <a href="https://solidified.io" rel="nofollow">Solidified.io</a>
                back in March 2019, see
                <a
                    href="https://web.solidified.io/contract/5b4769b1e6c0d80014f3ea4e/bug/5c83d86ac2dd6600116381f9"
                    rel="nofollow"
                    >bug report</a
                >. Solidified agreed on the importance of the bug. Unfortunately
                Gnosis Safe team did not officially announce the issue that
                affects their users. The issue, later posted on github
                <a
                    href="https://github.com/gnosis/safe-contracts/issues/100"
                    rel="nofollow"
                    >here</a
                >
                remains unanswered. It is also worth noting that the
                <a
                    href="https://github.com/gnosis/safe-contracts/blob/78494bcdbc61b3db52308a25f0556c42cf656ab1/docs/Gnosis_Safe_Formal_Verification_Report_1_0_0.pdf"
                    rel="nofollow"
                    >formal verification</a
                >
                performed by
                <a href="https://runtimeverification.com" rel="nofollow"
                    >Runtime Verification</a
                >
                for Gnosis, did not found the issue even though the contract
                code explicitly attempts to perform the check that enough gas is
                given to the transaction, see line 101
                <a
                    href="https://github.com/gnosis/safe-contracts/blob/5a8b07326faf30c644361c9d690d57dbeb838698/contracts/GnosisSafe.sol#L101"
                    rel="nofollow"
                    >here</a
                >.
            </p>
            <p>
                The community would have benefited from a disclosure from Gnosis
                when it published
                <a
                    href="https://blog.gnosis.pm/formal-verification-a-journey-deep-into-the-gnosis-safe-smart-contracts-b00daf354a9c"
                    rel="nofollow"
                    >the result of the formal verification</a
                >
                as this highlights the limitation of such verification, when the
                expected behaviour is not fully transcribed.
            </p>
            <p>
                While it is true that the issue facing such smart contract
                wallet, can be circumvented by making sure users sign a metatx
                gasLimit (called <code>safeTxGas</code> in Gnosis case) higher
                than normally necessary, this is not ideal and we should aim to
                move the security of the wallet in the smart contract code as
                much as possible.
            </p>
            <p>
                Indeed, with current Gnosis Safe implementation, the User
                Interface need to do extra work (increase the amount of gas to
                be signed by the user) to ensure users are safe against
                malicious relayers.
            </p>
            <p>
                You can imagine building such interface on IPFS (so that users
                can trust it does not change) that ensure extra gas is given but
                then if opcode pricing change, the interface might become
                vulnerable.
            </p>
            <p>
                Note that Consensys Dilligence actually mentions the issue
                <a
                    href="https://consensys.github.io/smart-contract-best-practices/known_attacks/#insufficient-gas-griefing"
                    rel="nofollow"
                    >here</a
                >
                and
                <a href="https://swcregistry.io/docs/SWC-126" rel="nofollow"
                    >here as SWC-126</a
                >
                but they actually fail to propose a correct solution, showing
                what seems a misunderstanding of the issue.
            </p>
            <p>
                Indeed the following code (similar to the one shown on Consensys
                documentation linked above and to Gnosis Safe code) is not
                sufficient to prevent the problem from happening
            </p>
            
            











            <p>
                The <code>require</code> call will not ensure that
                <code>to.call</code> actually receives the gas specified via
                parameter <code>gas</code> This is for 2 reasons actually:
            </p>
            <ul>
                <li>
                    The gas required for the call itself (opcode and memory)
                    would further reduce the gas available to be lower than what
                    reported by <code>gasleft()</code> when the call is actually
                    made.
                </li>
                <li>
                    Most importantly though, it is that even if at the point of
                    the call, the gas available was still sufficient, the 1/64
                    rule would reduce it even more.
                    <strong
                        >And because 1/64 of the gas required can be high enough
                        for the rest of the tx to succeed, the call can
                        continue.</strong
                    >
                </li>
            </ul>
            <p>
                For Meta transaction (like in Gnosis Safe case) this means that
                a relayer could sign the transaction (maliciously or by
                ignorance) with low enough gas so that the inner call fails but
                high enough so that transaction itself succeed. This would
                <strong
                    >result in the relayer getting rewarded for the execution,
                    while the user would see its meta transaction failing even
                    if signed with a high enough <code>safeTxGas</code></strong
                >
            </p>
            <p>
                Furthermore as it is possible that a user could generate a
                series of meta-transaction messages. If a relayer was able to
                make the first one fail, it could impact the whole series.
            </p>
            <p>
                This is why we need a way for smart contract to ensure that
                <em>callees</em> receive the exact amount of gas specified.
            </p>
            <h3 id="workaround-against-insuficient-gas-griefing-attack">
                <a
                    href="#workaround-against-insuficient-gas-griefing-attack"
                    aria-hidden="true"
                    tabIndex={0}
                    ><span className="icon icon-link"></span></a
                >Workaround Against “Insuficient Gas Griefing attack”
            </h3>
            <p>
                As mentioned above, the solution proposed by Consensys
                Dilligence is insufficient. In order to properly guard against
                the issue, we need to ensure there is enough gas at the point of
                the call being made.
            </p>
            <p>It turns out that with current EVM there are 2 ways to do it</p>
            <ol>
                <li>Check before the call</li>
            </ol>
            <pre
                className="language-undefined"
            ><code className="language-undefined">uint256 gasAvailable = gasleft() - E;
require(gasAvailable - gasAvailable / 64  &gt;= `txGas`, "not enough gas provided")
to.call.gas(txGas)(data); // CALL
</code></pre>
            <p>
                where E is the gas required for the operation between the call
                to <code>gasleft()</code> and the actual call PLUS the gas cost
                of the call itself. This is unfortunately opcode pricing
                dependent. As gas pricing continue to evolve, it is important to
                have a mechanism to ensure a specific amount of gas is passed to
                the call so such mechanism can be used without having to rely on
                a specific gas pricing.
            </p>
            <p>
                While it is possible to simply over estimate <code>E</code> by a
                large amount, it could still theoretically be insufficient as
                there are no guarantee opcode pricing will not change
                dramatically. Plus it would simply be better to have the EVM do
                the precise work itself.
            </p>
            <ol start={2}>
                <li>Check after the call:</li>
            </ol>
            <pre
                className="language-undefined"
            ><code className="language-undefined">to.call.gas(txGas)(data); // CALL
assert(gasleft() &gt; txGas / 63); // "not enough gas left"
</code></pre>
            <p>
                This workaround does not require to compute a
                <code>E</code> value as mentioned in the previous one and thus
                does not rely on a specific gas pricing (except for the
                behaviour of EIP-150). If the call is not given enough gas and
                fails for that reason, the condition above will always fail,
                ensuring the current call will revert.
            </p>
            <p>
                Note that this check still pass if the gas given was less AND
                the external call reverted or succeeded EARLY (so that the gas
                left after the call &gt; txGas / 63). This can be an issue if
                the code executed as part of the CALL is reverting as a result
                of a check against the gas provided. Like a meta transaction in
                a meta transaction. That is why we use an assert here, so that
                all gas is used, emulating an out of gas exception. NOTE: the
                <code>assert</code> do not use all gas in new version of
                solidity (&gt;= 0.8.0), you’ll have to use assembly to emit an
                invalid opcode.
            </p>
            <p>This workaround is actually used in several places today.</p>
            <ul>
                <li>
                    It was first implemented as part of my work on
                    <a href="https://www.sandbox.game" rel="nofollow"
                        >Sandbox</a
                    >
                    for a Meta Transaction standard (see
                    <a
                        href="https://github.com/ethereum/EIPs/issues/1776"
                        rel="nofollow"
                        >EIP-1776</a
                    >).
                </li>
                <li>
                    It is used by the winning entry I
                    <a href="https://metatx.eth.link" rel="nofollow"
                        >submited</a
                    >
                    for
                    <a
                        href="https://gitcoin.co/issue/MetaMask/Hackathons/2/3865"
                        rel="nofollow"
                        >gitcoin Metamask hackathon</a
                    >. See the code
                    <a
                        href="https://github.com/wighawag/singleton-1776-meta-transaction/blob/master/contracts/src/GenericMetaTxProcessor.sol#L180-L187"
                        rel="nofollow"
                        >here</a
                    >
                    that checks for gas left after the call.
                </li>
                <li>
                    PISA research also include it on their solution, see
                    <a
                        href="https://github.com/PISAresearch/contracts.any.sender/blob/da3d14b321974f2079ec598108fdd9426117418a/versions/0.1.8/contracts/Relay.sol#L54"
                        rel="nofollow"
                        >here</a
                    >
                </li>
            </ul>
            <p>
                While these workarounds can indeed be used now, they are limited
                and a proper solution will involve a change in the EVM.
            </p>
            <h3 id="proper-solution-against-insuficient-gas-griefing-attack">
                <a
                    href="#proper-solution-against-insuficient-gas-griefing-attack"
                    aria-hidden="true"
                    tabIndex={0}
                    ><span className="icon icon-link"></span></a
                >Proper Solution Against “Insuficient Gas Griefing attack”
            </h3>
            <p>
                In order to properly guard against the issue, we need to ensure
                there is enough gas at the point of the call being made. While
                the workarounds in the previous section will help developer
                build safe smart contracts with the EVM today, they are limited
                and I have thus proposed an EVM improvement, namely
                <a href="https://eips.ethereum.org/EIPS/eip-1930" rel="nofollow"
                    >EIP-1930</a
                >.
            </p>
            <p>
                In a nutshell, EIP-1930 would allow contracts to call other
                contracts with a strict gas semantic, that is, if the gas
                available (including the reduction done by the 1/64 rule) is not
                enough for the call to forward the amount of gas specified as
                part of the opcode, the caller get an out of gas exception.
            </p>
            <p>
                It can be implemented either as 3 new CALL* opcodes or by
                reserving specific gas value range (if we can ensure they have
                never been used before). See the proposal for details.
            </p>
            <p>
                This would allow smart contract wallet and meta-transaction in
                general to ensure that the user’s meta- transaction is given the
                exact amount of gas specified by the users’ signed message
                without any extra work or opcode pricing dependent logic. As
                such relayers would only get a reward if they give the right
                amount of gas for the transaction to succeed.
            </p>
            <h2 id="3-inner-call-out-of-gas-attack">
                <a
                    href="#3-inner-call-out-of-gas-attack"
                    aria-hidden="true"
                    tabIndex={0}
                    ><span className="icon icon-link"></span></a
                >3. Inner Call Out Of Gas Attack
            </h2>
            <p>
                It turns out that the behavior of gas is responsible for yet
                another issue. Indeed, a gas based attack is also possible on
                contracts that call other contracts with all gas available (that
                is 63/64 of all gas available). In other words, while the issue
                facing meta-transaction mentionned above, is that they cannot
                ensure easily that the inner call get a specific amount of gas,
                the attack described below affects any inner call whose failure
                do not cause the <em>caller</em> to revert.
            </p>
            <p>
                The result is somehow similar to a
                <strong>Call Depth Attack</strong> but different as for example
                calls like <code>&lt;address&gt;.send</code> won’t fail as these
                are still given the gas stipend. Indeed, as mentioned above the
                gas stipend is extra gas and is not affected by the 1/64 rules.
                As a result such calls are always guaranteed to have 2300 and
                cannot revert for a lack of gas (assuming of course that the
                recipient do not use more than 2300, or revert intentionally).
            </p>
            <p>
                But the issue has some similar semantic to the
                <strong>call depth attack</strong> when it is invoked on low
                level call that catch inner call failure. And these will
                probably become even more popular with the introduction of
                “try/catch” in solidity 0.6.
            </p>
            <p>
                To illustrate the issue, here is a solidity snippet, with the
                new try/catch feature of solidity 0.6 but the same applies to
                lower level calls that check for success.
            </p>
            
            


























            <p>
                A user calling <code>test</code> can basically make a
                transaction with a specific amount of gas that result in
                <code>callNeeding6400000Gas</code> not getting enough gas
                (smaller than 6,400,000), while the rest of
                <code>test</code> can continue.
            </p>
            <p>
                Let say “do something else in case of failure” consume 50,000
                gas. If the user make a transaction with a gasLimit of 6,400,000
                gas, when it reaches the inner call, it would not have enough
                anymore to give that same amount “callNeeding6400000Gas() “.
                Assuming such inner call was needing that amount, it would fails
                with an “out of gas exception”. This would result in the
                <code>catch</code> block being executed, which as we said need
                50,000 gas. Since we know that we had around 100,000 gas
                available (6,400,000 / 64), the transaction will complete
                sucessfully. The caller, here the Test contract would be unable
                to know wether the failure was due to a lack of gas or if the
                inner call simply reverted intentionally.
            </p>
            <p>
                As such the widlcard catch should be used with caution. A recent
                article on Ethereum foundation
                <a
                    href="https://blog.ethereum.org/2020/01/29/solidity-0.6-try-catch/"
                    rel="nofollow"
                    >blog post</a
                >, while illustrating nicely the feature, fails to warn user
                about the potential danger. I hope this blog post will help
                spread the words and ensure developer carry on with caution.
            </p>
            <p>
                A note in that regard has actually already been added to
                <a
                    href="https://github.com/ethereum/solidity/commit/a3b7c73e3f864da288f3da8bacb778c69a03bce0"
                    rel="nofollow"
                    >solidity documentation</a
                >
                after I mentioned the issue to Chris.
            </p>
            <p>
                To be clear the issue only arise if there is logic in the
                try/catch that should not be executed if the <em>callee</em> was
                expected to revert intentionally. For example if the
                <em>caller</em> expects a revert in the <em>callee</em> for a
                specific reason, like rejecting token transfer and perform some
                different logic when the call revert than when it does not.
            </p>
            <p>Let illustrates the issue with an example :</p>
            
            





















            <p>
                We assume here that the ERC20 token used is safe in that its
                functions cannot call back in the contract nor allow the
                recipient to reject the transfer. Under this conditions, the
                code above look at first sight completely safe. The try catch
                would technically be unecessary, but let’s go with it for the
                sake of the example.
            </p>
            <p>
                The reason why it is actually not safe, is, as described above,
                because the new bidder can provide a specific amount of gas so
                that there is not enough gas to give to the 2nd transfer call to
                succeed but enough for the rest. Since there is nothing
                happening after the try catch the rest will demand not much gas.
                maybe a few hundreds.
            </p>
            <p>
                So if the transferFrom demand something like 20,000 gas
                (possible with an ERC20 token) it will throw while 20,000 / 64
                &gt; 300 gas will be left in the bid call, which might be just
                enough to complete.
            </p>
            <p>
                The astute reader might have noticed that this code is the
                analogue of the one described
                <a
                    href="https://blog.ethereum.org/2016/06/10/smart-contract-security/"
                    rel="nofollow"
                    >here</a
                >
                except it applies to ERC20 tokens and not ethers.
            </p>
            <p>
                This is to illustrate how similar the
                <strong>Inner Call Out Of Gas Attack</strong> is to the
                <strong>Call Depth Attack</strong> that we aimed to destroy with
                EIP-150.
            </p>
            <p>
                Obviously the example is made in purpose and might not have any
                real life equivalent. As for one, as described in the article
                describing the <strong>Call Depth Attack</strong> it is
                recommended to favour pull over push transfers.
            </p>
            <p>
                But the recommendation normally stems from the fact that there
                are possibilities in the token for the recipient to reject a
                transfer. Here in the example above, that was not the issue.
            </p>
            <p>
                While there might currently be no practical scenario where the
                attack mention here have any importance, we should remain aware
                of it. And this is another reason to favor pull over push
                transfer as mentioned by consensys
                <a
                    href="https://consensys.github.io/smart-contract-best-practices/known_attacks/#dos-with-unexpected-revert"
                    rel="nofollow"
                    >here</a
                >
                and
                <a
                    href="https://consensys.github.io/smart-contract-best-practices/known_attacks/#dos-with-unexpected-revert"
                    rel="nofollow"
                    >there</a
                >.
            </p>
            <p>
                By the way you can easily try it out in
                <a href="http://remix.ethereum.org/" rel="nofollow"
                    >remix IDE</a
                >
            </p>
            <ol>
                <li>Add the following file:</li>
            </ol>
            












            <ol start={2}>
                <li>compile both</li>
                <li>deploy ERC20Token</li>
                <li>
                    deploy Auction (passing the address of the ERC20Token
                    contract as parameter)
                </li>
                <li>
                    select one account and execute <code>mint</code> with that
                    address and <code>amount</code> = <code>1000</code>
                </li>
                <li>
                    execute <code>bid</code> with that exact same amount
                    (<code>1000</code>) (so zero is left in the balance
                    afterward)
                </li>
                <li>
                    select another account and execute <code>mint</code> for
                    that address with <code>amount</code> = <code>2000</code>
                </li>
                <li>
                    execute <code>bid</code> with an <code>amount</code> =
                    <code>1001</code> and SPECIFY gasLimit = <code>60000</code>
                </li>
                <li>
                    check the balance of the first account and you will see it
                    is still zero. That account did not receive its refund from
                    its previous bid.
                </li>
            </ol>
            <p>
                You can then repeat the operartions without limiting the gas to
                60000 for step 9. and you will see that the first account will
                get back the amount as intended.
            </p>
            <p>
                This clearly shows that the transaction signer is able to
                influence the result of a contract call, simply by changing the
                gasLimit.
            </p>
            <h2 id="conclusion">
                <a href="#conclusion" aria-hidden="true" tabIndex={0}
                    ><span className="icon icon-link"></span></a
                >Conclusion
            </h2>
            <p>
                I hope the post was informative and helped elucidate the issue
                Ethereum developers are facing with the current gas behaviour.
                In particular how CALL* opcodes behave.
            </p>
            <p>
                Help me put forward
                <a href="https://eips.ethereum.org/EIPS/eip-1930" rel="nofollow"
                    >EIP-1930</a
                >
                in the next hardfork as this would solve at least the gas issues
                faced by all smart contract wallet and meta transaction
                processor out there.
            </p>
            <p>
                Special thanks to
                <a href="https://twitter.com/whalelephantK" rel="nofollow"
                    >Belsy</a
                >,
                <a href="https://medium.com/@fabiohildebrand" rel="nofollow"
                    >Fabio Hildebrand</a
                >
                and
                <a href="https://twitter.com/rolandk" rel="nofollow"
                    >Roland Kofler</a
                >
                for reviewing the article.
            </p>
            <p>Thanks for reading.</p>
            <p >
                This post can also be found on medium
                <a
                    href="https://medium.com/@wighawag/ethereum-the-concept-of-gas-and-its-dangers-28d0eb809bb2"
                    >here</a
                >
                where you can follow me.
            </p>
        </div>
    </div>
</div>


    </>
  );
};



export default BlogOne;

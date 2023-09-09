import { ThirdwebProvider } from '@thirdweb-dev/react';
import '../styles/index.css';
import 'dotenv/config'
import { StateContextProvider } from '../context';
import { TokenContextProvider } from '../context/Token';
import { Sepolia } from "@thirdweb-dev/chains";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = 'Sepolia';

function MyApp({ Component, pageProps }) {
	return (
		<ThirdwebProvider
			activeChain="arbitrum-goerli"
			clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
		>
		<StateContextProvider>
        <TokenContextProvider>
			<Component {...pageProps} />
		</TokenContextProvider>
		</StateContextProvider>
		</ThirdwebProvider>
	);
}

export default MyApp;

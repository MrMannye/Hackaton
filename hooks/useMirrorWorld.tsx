/**
 * Return
 * - user
 * - mirrorworld
 * - login function
 */
import {ReactNode, createContext, useContext, useState, useEffect, useRef} from "react";
import {ClusterEnvironment, IUser, MirrorWorld} from "@mirrorworld/web3.js";
import { useDispatch } from "react-redux";
import { saveUser } from "@/features/user/userSlice";
import { useRouter } from "next/router";

export interface IMirrorWorldContext {
  user?: IUser,
  mirrorworld?: MirrorWorld,
  //transferSol(): Promise<void>,
  login(): Promise<void>
}

const MirrorWorldContext = createContext<IMirrorWorldContext>({} as IMirrorWorldContext)

export function useMirrorWorld() {
  return useContext(MirrorWorldContext)
}

const storageKey = `dapp_proactive`

export const MirrorWorldProvider = ({ children }: { children: ReactNode }) => {
  const [mirrorworld, setMirrorworld] = useState<MirrorWorld>()
  const [user, setUser] = useState<IUser>()
  const router = useRouter();
  const dispatch = useDispatch();
  const isInitialized = useRef(false)
  
  async function login() {
    if (!mirrorworld) throw new Error("Mirror World SDK is not initialized")
    const result = await mirrorworld.login()
    console.log("result", result)
    if (result.user) {
      setUser(result.user)
      dispatch(saveUser(result.user));
      localStorage.setItem(storageKey, result.refreshToken)
      router.push("/mytasks")
    }
  }
  
  /*const recipientAddress = "7icXZr9isqt63QNmotLmSmvaq1iHM6YNswRos8ATwTQh"
  const amount = 100 // Amount * Decimals
  async function transferSol(){
    if (!mirrorworld) throw new Error("Mirror World SDK is not initialized")
    console.log("Transfer")
    const transactionResult = await mirrorworld.transferSOL({
        recipientAddress,
        amount,
    })
    console.log(transactionResult) 
  }*/

  function initialize () {
    const refreshToken = localStorage.getItem(storageKey)
    console.log("refreshToken", refreshToken)
    const instance = new MirrorWorld({
      apiKey: "mw_4hkxDYKEq1oSPO81ImMCRk15CamjT0EKkEj",
      env: ClusterEnvironment.testnet,
      ...refreshToken && { autoLoginCredentials: refreshToken }
    })
  
    instance.on('auth:refreshToken', async (refreshToken) => {
      if (refreshToken) {
        localStorage.setItem(storageKey, refreshToken)
        const user = await instance.fetchUser()
        setUser(user)
        dispatch(saveUser(user));
      }
    })
  
    setMirrorworld(instance)
  }
  
  useEffect(() => {
    if (!isInitialized.current) {
      initialize()
    }

    return () => {
      isInitialized.current = true
    }
  }, [])
  
  
  return (
    <MirrorWorldContext.Provider value={{
      mirrorworld,
      user,
      //transferSol,
      login
    }}>
      {children}
    </MirrorWorldContext.Provider>
  )
}
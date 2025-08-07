'use client'

import { NorthwindDashboard } from '../components/NorthwindDashboard'
import { DebugPanel } from '../src/components/DebugPanel'

export default function Home() {
  return (
    <>
      <NorthwindDashboard />
      {process.env.NODE_ENV === 'development' && <DebugPanel />}
    </>
  )
}
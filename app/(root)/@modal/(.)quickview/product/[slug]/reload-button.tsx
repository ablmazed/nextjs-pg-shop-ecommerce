'use client'

import React from 'react'

import { Button } from '@/components/ui/button'

const ReloadButton = () => {
  return (
    <Button
      onClick={() => window.location.reload()}
      variant="default"
      className="w-full"
    >
      View Products
    </Button>
  )
}

export default ReloadButton

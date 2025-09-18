import products from '@/static/apartments.json'

export default defineEventHandler(async () => {
  await new Promise(resolve => setTimeout(resolve, 300))

  return {
    status: 'success',
    data: products
  }
})

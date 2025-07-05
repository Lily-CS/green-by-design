// Simplified carbon footprint calculation based on cloud usage patterns

export interface CarbonCalculationResult {
  co2eTons: number
  kilowattHours: number
  cost: number
}

export async function calculateAWSCarbonFootprint(
  monthlySpend: number,
  serviceCategory: string,
  region: string = 'us-east-1'
): Promise<CarbonCalculationResult> {
  try {
    // Mock calculation based on spend and service type
    // In production, you'd connect to actual AWS APIs with credentials
    
    const estimatedUsage = estimateUsageFromSpend(monthlySpend, serviceCategory)
    const carbonIntensity = getCarbonIntensityByRegion(region)
    const energyUsage = estimatedUsage * getEnergyMultiplier(serviceCategory)
    
    // Calculate CO2 emissions (tons)
    const co2eTons = (energyUsage * carbonIntensity) / 1000000 // Convert to tons
    
    return {
      co2eTons: Math.round(co2eTons * 100) / 100, // Round to 2 decimals
      kilowattHours: Math.round(energyUsage * 100) / 100,
      cost: monthlySpend
    }
  } catch (error) {
    console.error('Carbon footprint calculation error:', error)
    
    // Fallback calculation if API fails
    return {
      co2eTons: Math.round((monthlySpend * 0.0001) * 100) / 100,
      kilowattHours: Math.round((monthlySpend * 2.1) * 100) / 100,
      cost: monthlySpend
    }
  }
}

function estimateUsageFromSpend(spend: number, serviceCategory: string): number {
  // Estimated resource usage based on monthly spend
  const spendMultipliers: Record<string, number> = {
    compute: 2000, // Instance hours
    storage: 10000, // GB storage
    database: 1500, // DB hours
    networking: 5000, // Data transfer GB
    serverless: 100000, // Function invocations
    'ai-ml': 500, // Model inference hours
    analytics: 1000, // Processing jobs
    security: 800 // Security events processed
  }
  
  return spend * (spendMultipliers[serviceCategory] || 1000)
}

function getEnergyMultiplier(serviceCategory: string): number {
  // kWh per unit of usage by service type
  const energyMultipliers: Record<string, number> = {
    compute: 0.05, // kWh per instance hour
    storage: 0.001, // kWh per GB
    database: 0.08, // kWh per DB hour
    networking: 0.002, // kWh per GB transferred
    serverless: 0.0001, // kWh per invocation
    'ai-ml': 0.15, // kWh per inference hour
    analytics: 0.12, // kWh per processing job
    security: 0.01 // kWh per security event
  }
  
  return energyMultipliers[serviceCategory] || 0.05
}

function getCarbonIntensityByRegion(region: string): number {
  // CO2 grams per kWh by AWS region (approximate values)
  const carbonIntensity: Record<string, number> = {
    'us-east-1': 429, // Virginia
    'us-west-2': 350, // Oregon
    'eu-west-1': 316, // Ireland
    'ap-southeast-1': 431, // Singapore
    'ap-northeast-1': 518, // Tokyo
    'eu-central-1': 338, // Frankfurt
    'us-west-1': 345, // California
    'ap-south-1': 631, // Mumbai
    'ca-central-1': 130 // Canada Central
  }
  
  return carbonIntensity[region] || 400 // Default average
}

export function formatCarbonResult(result: CarbonCalculationResult): string {
  if (result.co2eTons < 0.01) {
    return `${(result.co2eTons * 1000).toFixed(1)} kg CO₂e`
  }
  return `${result.co2eTons.toFixed(2)} tons CO₂e`
}
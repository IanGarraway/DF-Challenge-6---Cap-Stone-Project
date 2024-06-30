import React from 'react'
import { Table } from 'react-bootstrap'

function StatsScreen({stats, equipment, upgrades}) {
  return (
      <div className='statTable' style={{ width: '30vw' }} >
          <Table  variant='dark'>
              <thead className='statTableFont'>
                  <th >Gathering per cycle</th>
                  <th className='cellValue'>total: {stats.gathVol}</th>
              </thead>
              <tbody>
                  
                  
                  <tr>
                      <td>Claw </td>
                      <td className='cellValue'>{equipment.clawHydrolics.gathVol }</td>
                  </tr>
                  
                  <tr>
                      <td>Magnet </td>
                      <td className='cellValue'>{equipment.magnetMotor.gathVol + equipment.magnetCore.gathVol }</td>
                  </tr>
                  
                  <tr>
                      <td>Scoop </td>
                      <td className='cellValue'>{equipment.magnetMotor.gathVol + equipment.magnetCore.gathVol }</td>
                  </tr>
              </tbody>
                            
          </Table>
          <Table variant='dark'>
               <thead>
                  <th colSpan={2} className='statTableFont'>Production per cycle</th>                  
              </thead>
              <tbody>
                  <tr>
                      <td>Grinder</td>
                      <td className='cellValue'>{stats.grinderVol }</td>
                  </tr>
                  <tr>
                      <td>Smelter</td>
                      <td className='cellValue'>{upgrades.smelter * 10 ||10 }</td>
                  </tr>
                  
                  
              </tbody>
          </Table>
          
          
    </div>
  )
}

export default StatsScreen



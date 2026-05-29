import { RECON_EDGES, RECON_NODES } from '../app/config'

export default function ReconMinimap({ pathname, discoveredRoutes }) {
  return (
    <aside className="recon-minimap hidden md:block" aria-label="Recon route map">
      <p className="recon-minimap-label">Recon Map</p>
      <svg viewBox="0 0 122 86" role="img" aria-label="Discovered route graph" className="recon-minimap-svg">
        {RECON_EDGES.map(([from, to]) => {
          const fromNode = RECON_NODES.find(({ path }) => path === from)
          const toNode = RECON_NODES.find(({ path }) => path === to)
          if (!fromNode || !toNode) {
            return null
          }

          const edgeActive = discoveredRoutes.includes(from) && discoveredRoutes.includes(to)

          return (
            <line
              key={`${from}-${to}`}
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              className={edgeActive ? 'recon-edge recon-edge-active' : 'recon-edge'}
            />
          )
        })}

        {RECON_NODES.map((node) => {
          const isCurrent = node.path === pathname
          const isDiscovered = discoveredRoutes.includes(node.path)
          const nodeClass = isCurrent
            ? 'recon-node recon-node-current'
            : isDiscovered
              ? 'recon-node recon-node-discovered'
              : 'recon-node'

          return (
            <g key={node.path} transform={`translate(${node.x}, ${node.y})`}>
              <circle r="4" className={nodeClass} />
              <text x="6" y="3" className="recon-node-label">{node.short}</text>
            </g>
          )
        })}
      </svg>
    </aside>
  )
}

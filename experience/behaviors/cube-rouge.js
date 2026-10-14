/** @type {import('../../core/behaviors').Behavior} */
export default {
  onFound(ctx) {
    if (!ctx.state.cube) {
      // Cube de 20 % de la largeur de l'affiche (1 unité = largeur de l'affiche)
      const geometry = new ctx.THREE.BoxGeometry(0.2, 0.2, 0.2)
      const material = new ctx.THREE.MeshStandardMaterial({
        color: 0xff0000,
        roughness: 0.3,
        metalness: 0.1,
      })
      const cube = new ctx.THREE.Mesh(geometry, material)

      // Centre de l'affiche (0.5, 0.5) et décollé de 0.15 vers le spectateur
      const position = ctx.toLocal(0.5, 0.5, 0.15)
      cube.position.copy(position)

      ctx.poster.add(cube)
      ctx.state.cube = cube
    }

    if (ctx.state.cube.parent !== ctx.poster) {
      ctx.poster.add(ctx.state.cube)
    }
    ctx.state.cube.visible = true
  },

  onLost(ctx) {
    if (ctx.state.cube) {
      ctx.state.cube.visible = false
    }
  },

  onUpdate(ctx, t, dt) {
    if (!ctx.state.cube || !ctx.state.cube.visible) return

    // Rotation douce sur les axes X et Y
    ctx.state.cube.rotation.x += dt * 0.6
    ctx.state.cube.rotation.y += dt * 0.9
  },
}

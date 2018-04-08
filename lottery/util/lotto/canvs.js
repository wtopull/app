const ctx = this.obj[i].getContext('2d')
      ctx.arc(40, 40, 40, 0, 2 * Math.PI)
      ctx.strokeStyle = '#00c77a'
      ctx.fillStyle = '#00c77a'
      ctx.stroke()
      ctx.fill()

      ctx.lineWidth = 4
      ctx.strokeStyle = 'rgba(255, 255, 255 ,.6)'
      ctx.beginPath()
      ctx.arc(40, 40, 34, this._getRads(0), this._getRads(80))
      ctx.stroke()

      ctx.beginPath()
      ctx.arc(40, 40, 34, this._getRads(90), this._getRads(170))
      ctx.stroke()

      ctx.beginPath()
      ctx.arc(40, 40, 34, this._getRads(180), this._getRads(260))
      ctx.stroke()

      ctx.beginPath()
      ctx.arc(40, 40, 34, this._getRads(270), this._getRads(350))
      ctx.stroke()

      ctx.beginPath()
      ctx.strokeStyle = 'rgba(255, 255, 255 ,1)'
      ctx.arc(40, 40, 34, this._getRads(270 - i * 90), this._getRads(350 - i * 90))
      ctx.stroke()
<script>
export default {
    name:'tabs',
    props:['panes','views','paneNames'],
    data(){
      return {
        activeName:this.panes[0]
      }
    },
    render(h){
      //el-tabs may be Flash of Unstyled Content 
      return (
            <el-tabs class="reposal-tabs" type="card" v-model={this.activeName}>
            {
              this.paneNames.map((label,index) => {
                const name = this.panes[index] || `${index}`
                return (
                        <el-tab-pane label={label} name={name} ref={name}>
                          {this.views[index]}
                        </el-tab-pane>
                )

              })
            }
          </el-tabs>
        )
    },
    mounted(){
      this.$children[0].$on('tab-click',tab => this.$store.commit('reposal/setTabName',tab.name))
    }
}
</script>

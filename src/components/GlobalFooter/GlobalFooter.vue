<template>
  <div class="footer">
    <div class="links">
      <a
        href="http://www.hqu.edu.cn/"
        target="_blank"
      >华侨大学</a>
      <a
        href="http://www.kooboo.org/"
        target="_blank"
      >
        亚尔迪
      </a>
      <a href="http://cst.hqu.edu.cn/" target="_blank">计算机学院</a>
      <a href="https://vue.ant.design/">Vue Antd</a>
    </div>
    <div class="copyright">
      Copyright
      <a-icon type="copyright" /> 2019 <span>HQU & 亚尔迪 联合出品</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GlobalFooter',
  data () {
    return {}
  }
}
</script>

<style lang="less" scoped>
.footer {
  padding: 0 16px;
  margin: 48px 0 24px;
  text-align: center;

  .links {
    margin-bottom: 8px;

    a {
      color: rgba(0, 0, 0, 0.45);

      &:hover {
        color: rgba(0, 0, 0, 0.65);
      }

      &:not(:last-child) {
        margin-right: 40px;
      }
    }
  }
  .copyright {
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
  }
}
</style>

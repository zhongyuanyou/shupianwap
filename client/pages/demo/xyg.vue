<template>
  <div>
    <OpenApp />
    <br />
    <InstallApp />
    <br />
    <SelectCheckBox :select-list="selectList" />
  </div>
</template>

<script>
import OpenApp from '@/components/app/OpenApp'
import InstallApp from '@/components/app/InstallApp'
import SelectCheckBox from '@/components/filters/SelectCheckBox'
export default {
  name: 'xyg',
  components: {
    OpenApp,
    InstallApp,
    SelectCheckBox,
  },
  data() {
    return {
      selectList: [
        {
          id: '1',
          name: '科技信息',
        },
        {
          id: '2',
          name: '科技信息',
        },
        {
          id: '3',
          name: '科技信息',
        },
        {
          id: '4',
          name: '科技信息',
        },
        {
          id: '5',
          name: '科技信息',
        },
        {
          id: '6',
          name: '科技信息',
        },
        {
          id: '7',
          name: '科技信息',
        },
        {
          id: '8',
          name: '科技信息',
        },
        {
          id: '9',
          name: '科技信息',
        },
        {
          id: '10',
          name: '科技信息',
        },
        {
          id: '11',
          name: '科技信息',
        },
        {
          id: '12',
          name: '科技信息',
        },
      ],
    }
  },
}
</script>

<style scoped></style>

"use client";

import { BadgeCard } from "./badge-card";
import { TableData } from "./table-data";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/motion-variants";

export default function TableLayout({
  title,
  data = [],
  loading,
  columns = [],
  filterNames,
  badges = [],
  AdditionComponent,
  pagination,
  onPageChange,
  onSearch,
  searchValue,
  hideActions,
}) {
  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {badges.length !== 0 && (
        <motion.div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${+badges.length} gap-4`}
          variants={containerVariants}
        >
          {badges.map((data, index) => (
            <motion.div key={index} variants={itemVariants}>
              <BadgeCard
                title={data.title}
                count={data.count}
                Icon={data.Icon}
              />
            </motion.div>
          ))}
        </motion.div>
      )}

      <motion.div variants={itemVariants}>
        <div className="flex items-center justify-between gap-2 flex-wrap mb-4">
          <h1 className="text-2xl font-bold capitalize">
            {title &&
              `${title} ${
                !hideActions
                  ? `(${pagination?.total || data?.length || 0})`
                  : ""
              }`}
          </h1>

          <div className="flex items-center gap-2 flex-wrap">
            {AdditionComponent && AdditionComponent}
          </div>
        </div>

        <TableData
          title={title}
          columns={columns}
          data={data}
          loading={loading}
          filterNames={filterNames}
          pagination={pagination}
          onPageChange={onPageChange}
          onSearch={onSearch}
          searchValue={searchValue}
          hideActions={hideActions}
        />
      </motion.div>
    </motion.div>
  );
}
